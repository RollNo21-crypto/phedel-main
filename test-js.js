const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('http://localhost:8000');
  await page.waitForTimeout(2000);
  
  const hasNavbar = await page.evaluate(() => {
    return document.getElementById('navbar-container') !== null;
  });
  
  const hasSearchModal = await page.evaluate(() => {
    return document.getElementById('search-modal') !== null;
  });
  
  console.log('Navbar container exists:', hasNavbar);
  console.log('Search modal exists:', hasSearchModal);
  
  await browser.close();
})();
