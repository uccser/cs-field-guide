const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const VIEWPORT = {
    width: 480,
    height: 320,
    deviceScaleFactor: 1
};
const VIEWPORT_LARGE = { // 75% larger
    width: 840,
    height: 560,
    deviceScaleFactor: 1 / 1.75
}
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
        var generated_count = 0;
        for (var i = 0; i < data.length; i++) {
            var slug = data[i][0],
                language = data[i][1],
                url = BASE_URL + data[i][2] + INTERACTIVE_PAGE_PARAMS,
                dest = data[i][3],
                is_interactive = data[i][4],
                use_large_thumbnail = data[i][5];

            if (is_interactive) {
                const page = await browser.newPage();
                if (use_large_thumbnail) {
                    page.setViewport(VIEWPORT_LARGE)
                    console.log(`Creating large screenshot for interactive ${slug} in language ${language}`);
                } else {
                    page.setViewport(VIEWPORT)
                    console.log(`Creating screenshot for interactive ${slug} in language ${language}`);
                }
                await page.goto(url);
                if (!fs.existsSync(path.dirname(dest))) {
                    fs.mkdirSync(path.dirname(dest));
                }
                await page.screenshot({ path: dest, omitBackground: true });
                generated_count++;
            }
        }
        console.log(`\nCreated ${generated_count} screenshots.`);
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
        json_data = Buffer.concat(data).toString();
        generateThumbnails(JSON.parse(json_data));
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});
