Business Listings Scraper
Overview
This script is a web scraper designed to extract business contact information from publicly available web pages. It uses Puppeteer with stealth plugins to minimize detection and ensure smooth scraping. The extracted data includes:

Business Name
Phone Number
Address
The results are saved in a structured JSON format for easy use in data analysis or business intelligence applications.

Features
✅ Uses Puppeteer Extra with stealth plugins for improved anonymity.
✅ Implements randomized user agents to mimic human behavior.
✅ Introduces delays between requests to reduce detection risks.
✅ Extracts structured business data from web pages dynamically.
✅ Saves the scraped data in a JSON file (scrapedData.json).

Installation
Clone this repository:
bash
Copy
Edit
git clone https://github.com/Izayarara/BusinessScraper.git
cd yourrepository
Install dependencies:
bash
Copy
Edit
npm install puppeteer-extra puppeteer-extra-plugin-stealth random-useragent
Run the script:
bash
Copy
Edit
node scraper.js
Usage
Ensure you replace ReplaceWithYourTargetHere in the script with the actual URL of the site you wish to scrape.
Run the script, and it will iterate through multiple pages, collecting business information and saving it to scrapedData.json.
The scraper includes timeouts and error handling to manage slow-loading pages and avoid unnecessary crashes.
Sample Output
json
Copy
Edit
[
  {
    "name": "Jiffy Lube",
    "phone": "(918) 933-5823",
    "address": "7853 S Olympia Ave\nTulsa, OK 74132"
  },
  {
    "name": "Creitz Automotive, LLC",
    "phone": "(918) 622-0043",
    "address": "8150 E 46th St\nTulsa, OK 74145"
  }
]
Legal & Ethical Considerations
This script is intended for educational and research purposes only. Ensure that your usage complies with the terms of service of the website you are scraping. Always obtain permission before scraping non-public or proprietary data.

Contributing
Feel free to fork this project and submit pull requests with improvements or additional features!

License
This project is licensed under the MIT License, allowing modification and distribution with attribution.

This keeps it professional while ensuring users understand how to use the script responsibly. Let me know if you want any changes! 🚀
