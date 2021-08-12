const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const VIEWPORT = {
    width: 480,
    height: 320,
    deviceScaleFactor: 1
};
const SCREENSHOT_BASE_PATH = './build/img/interactives/thumbnails/';
const BASE_URL = 'http://django:8000';
const INTERACTIVE_PAGE_PARAMS = '?hide-debug-toolbar';


function generateThumbnails(data) {
    // Create directory if it doesn't exist
    if (!fs.existsSync(SCREENSHOT_BASE_PATH)) {
        fs.mkdirSync(SCREENSHOT_BASE_PATH);
    }
    puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }).then(async browser => {
        const page = await browser.newPage();
        page.setViewport(VIEWPORT);
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

var args = process.argv.slice(2);

if (args[0] == '--production') {
    query_parameters = 'all_languages';
    console.log('Generating interactive thumbnails for all languages')
} else if (args[0] == '--language' && args[1]) {
    language_code = args[1];
    query_parameters = `language=${language_code}`;
    console.log(`Generating interactive thumbnails for '${language_code}' only`)
} else {
    query_parameters = '';
    console.log("Generating interactive thumbnails for 'en' only")
}

http.get(BASE_URL + `/en/interactives/thumbnail-json/?${query_parameters}`, res => {
    let data = [];

    res.on('data', chunk => {
        data.push(chunk);
    });

    res.on('end', () => {
        generateThumbnails(JSON.parse(Buffer.concat(data).toString()));
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});
