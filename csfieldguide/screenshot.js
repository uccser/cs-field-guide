const request = require('request');
const fs = require('fs');
const puppeteer = require('puppeteer');
const VIEWPORT = {
    width: 800,
    height: 600,
    deviceScaleFactor: 1
};
const SCREENSHOT_BASE_PATH = './build/img/interactives/thumbnails/';
const SCREENSHOT_EXTENSION = '.png';
const BASE_URL = 'http://localhost:80';  // This is the internal port of 80, not the external port mapping of 81
const INTERACTIVE_PAGE_PARAMS = '?hide-debug-toolbar';

if (!fs.existsSync(SCREENSHOT_BASE_PATH)){
    fs.mkdirSync(SCREENSHOT_BASE_PATH);
}


function generateThumbnails(data) {
  var thumbnail_data = JSON.parse(data)['thumbnails'];
  puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {
    const page = await browser.newPage();
    page.setViewport(VIEWPORT)
    for (var thumbnail_slug in thumbnail_data) {
      console.log('Getting screenshot for ' + thumbnail_slug);
      var url = BASE_URL + thumbnail_data[thumbnail_slug] + INTERACTIVE_PAGE_PARAMS;
      var dest = SCREENSHOT_BASE_PATH + thumbnail_slug + SCREENSHOT_EXTENSION;
      await page.goto(url);
      await page.screenshot({ path: dest });
      console.log('Finished screenshot for ' + thumbnail_slug);
    }
    await browser.close();
  });
}


request(
  BASE_URL + '/interactives/thumbnail-json/',
  function (error, response, body) {
    generateThumbnails(body);
  },
  json=true
);
