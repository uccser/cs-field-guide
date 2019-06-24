const request = require('request');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const VIEWPORT = {
    width: 480,
    height: 320,
    deviceScaleFactor: 1
};
const SCREENSHOT_BASE_PATH = './build/img/interactives/thumbnails/';
const BASE_URL = 'http://localhost:80';  // This is the internal port of 80, not the external port mapping of 81
const INTERACTIVE_PAGE_PARAMS = '?hide-debug-toolbar';

if (!fs.existsSync(SCREENSHOT_BASE_PATH)){
    fs.mkdirSync(SCREENSHOT_BASE_PATH);
}


function generateThumbnails(json_data) {
  var data = JSON.parse(json_data);
  puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {
    const page = await browser.newPage();
    page.setViewport(VIEWPORT)
    for (var i = 0; i < data.length; i++) {
      var slug = data[i][0],
        language = data[i][1],
        url = BASE_URL + data[i][2] + INTERACTIVE_PAGE_PARAMS,
        dest = data[i][3];
      console.log('Creating screenshot for interactive ' + slug + ' in language ' + language);
      await page.goto(url);
      if (!fs.existsSync(path.dirname(dest))) {
        fs.mkdirSync(path.dirname(dest));
      }
      await page.screenshot({ path: dest, omitBackground: true });
    }
    await browser.close();
  });
}


request(
  BASE_URL + '/interactives/thumbnail-json/?all_languages=true',
  function (error, response, body) {
    generateThumbnails(body);
  },
  json=true
);
