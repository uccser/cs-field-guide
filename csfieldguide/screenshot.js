const http = require('http');
const fs = require('fs');
const puppeteer = require('puppeteer');
const VIEWPORT = {
    width: 1024,
    height: 576,
    deviceScaleFactor: 0.2
};
const SCREENSHOT_BASE_PATH = './build/img/interactives/thumbnails/';
const SCREENSHOT_EXTENSION = '.png';
const BASE_URL = 'http://localhost:80';

if (!fs.existsSync(SCREENSHOT_BASE_PATH)){
    fs.mkdirSync(SCREENSHOT_BASE_PATH);
}


async function getScreenshot(url, dest) {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  page.setViewport(VIEWPORT)
  await page.goto(url);
  await page.screenshot({path: dest});
  await browser.close();
}


function generateThumbnails(data) {
  console.log(data);
  var json = {
    'thumbnails': {
        'awful-calculator': '/en/interactives/iframe/awful-calculator/'
    }
  };
  var thumbnail_data = json["thumbnails"];
  for (var thumbnail_slug in thumbnail_data) {
    console.log('Getting screenshot for ' + thumbnail_slug);
    var url = BASE_URL + thumbnail_data[thumbnail_slug];
    var dest = SCREENSHOT_BASE_PATH + thumbnail_slug + SCREENSHOT_EXTENSION;
    getScreenshot(url, dest);
  }
}


generateThumbnails({});

// $.ajax({
//   type: "GET",
//   url: BASE_URL + '/interactives/thumbnail-json/',
//   async: true,
//   cache: true,
//   dataType: "json",
//   success: generateThumbnails,
// });
