const puppeteer = require('puppeteer-extra');
const puppeteerExtraPluginStealth = require('puppeteer-extra-plugin-stealth');
const randomUserAgent = require('random-useragent');
const fs = require('fs'); // Import fs module for file operations

// Add stealth plugin
puppeteer.use(puppeteerExtraPluginStealth());

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // true for headless, false if you want to see the browser
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
  });

  const page = await browser.newPage();

  // Set a randomized user-agent from the random-useragent library
  const userAgent = randomUserAgent.getRandom();
  await page.setUserAgent(userAgent);

  // Disable WebRTC to avoid IP leakage
  await page.evaluateOnNewDocument(() => {
    // Disable WebRTC
    Object.defineProperty(navigator, 'webkitGetUserMedia', { value: () => {} });
    Object.defineProperty(navigator, 'getUserMedia', { value: () => {} });
  });

  let currentPage = 1;
  let hasNextPage = true;

  // Open file stream for appending data to the file
  const outputFile = fs.createWriteStream('scrapedData.json', { flags: 'a' });

  // Write initial content to the file to indicate start
  outputFile.write('[\n');

  // Loop through the pages
  while (hasNextPage) {
    console.log(`Scraping page ${currentPage}...`);

    await page.goto(`https://www.ReplaceWithYourTargetHere?page=${currentPage}`, {
      waitUntil: 'networkidle0',
    });

    // Wait for the content to load
    try {
      await page.waitForSelector('.info', { timeout: 60000 }); // Increased timeout
    } catch (error) {
      console.log(`Error waiting for selector: ${error.message}`);
      break; // Exit loop if selector not found after timeout
    }

    // Extract data (adjusted the selectors)
    const data = await page.$$eval('.info', (elements) => {
      return elements.map((el) => {
        const name = el.querySelector('.business-name') ? el.querySelector('.business-name').innerText.trim() : null;
        const phoneElement = el.querySelector('.phones');
        const phone = phoneElement ? phoneElement.innerText.trim() : null;
        const addressElement = el.querySelector('.adr');
        const address = addressElement ? addressElement.innerText.trim() : null;

        // Debugging: Log each element to check structure
        console.log(`Name: ${name}, Phone: ${phone}, Address: ${address}`);

        return {
          name,
          phone,
          address
        };
      });
    });

    console.log(`Page ${currentPage} data:`, data);

    // If data is found, write it to the file
    if (data.length > 0) {
      data.forEach((item, index) => {
        // Check if it's not the first item in the file, to avoid trailing commas
        if (currentPage !== 1 || index !== 0) {
          outputFile.write(',\n'); // Add comma for separation
        }
        outputFile.write(JSON.stringify(item)); // Write the current data entry
      });
    }

    // Introduce a random delay to mimic human behavior
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000)); // Random delay between 2 and 5 seconds

    // Check if we've reached a page with no content (could be the last page)
    if (data.length === 0) {
      console.log('No more data found, stopping...');
      break;
    }

    // Increment the page number for the next iteration
    currentPage++;
  }

  // Close the file by writing the closing bracket
  outputFile.write('\n]');

  // Close the browser and the file
  await browser.close();
  outputFile.end();

  console.log('Scraping complete. Data saved to scrapedData.json');
})();
