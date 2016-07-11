# Interactives

We have plenty of interactives throughout the CSFG, to teach many different computer science concepts.

## Troubleshooting

Most of our interactives require a modern browser, if it's been updated in the last year you should be fine. We recommend [Google Chrome](https://www.google.com/chrome/) or [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/). While most interactives work on both phones, tablets, and desktop computers, some of our more complex interactives require a desktop computer to achieve acceptable performance.

### WebGL on Windows, Linux and Mac OS X

The graphics chapter uses [WebGL](https://en.wikipedia.org/wiki/WebGL), which is a system that can render 3D images in a web browser. It is relatively new, so older browsers and operating systems may not have it setup correctly.

#### Quick Fixes
[Here](http://caniuse.com/#search=webgl) is a quick way to check if WebGL will work on your system. The general rule of thumb is if you are using an up-to-date version of Chrome or Firefox and the drivers for your operating system are up-to-date and the computer has a suitable GPU, then it should work. For Safari you will need to adjust some settings. The details for getting WebGL set up are below.

##### Updating your operating system

If you’re on Windows, make sure you have the [Microsoft DirectX runtime](https://www.microsoft.com/en-us/software-download/windows10) installed — this is a free download from Microsoft. Once you’ve done that, make sure that you’ve got the very latest versions of the drivers for your graphics card. We recommend doing this manually, there are good tutorials on the internet. There is a good video here that explains how to do this. The easiest way is to install an free driver update program like [SlimDriver](http://download.cnet.com/SlimDrivers-Free/3000-18513_4-75279940.html) which will find missing and out-of-date drivers.

For MacOS:
1. Click the Apple logo.
2. On the “Apple” menu, click “Software Update.”
3. If there is a Mac OS X update available, you can install it. If there is a graphics driver update, it will be included in the Mac OS X update.

##### Updating your browser

This depends on which browser you are using. If you can use Chrome it can be a little easier to get working.

- Firefox: just make sure you have version 4 or higher.
- Chrome: all you need to do is install it, or if you’re already using it, just check whether it’s updated itself to version 10 or later — this will almost certainly have happened automatically (it was released in March 2011), but you can check from the “About Google Chrome” option on the tools menu to confirm.
- Safari: on Macs, OS X 10.7 has WebGL support, but it’s switched off by default. To switch it on, enable the developer menu and check the “[Enable WebGL](http://www.ikriz.nl/2011/08/23/enable-webgl-in-safari/)” option.

All older version of these browsers require manual enabling of WebGL. For more information on getting a WebGL implementation follow [this link](https://www.khronos.org/webgl/wiki/Getting_a_WebGL_Implementation).

#### Trouble in Linux, Windows or Mac OS X

If the above doesn’t work then you may unfortunately have a blacklisted GPU / graphics card, or your graphics drivers may be out of date because the company has discontinued their support. In most cases we can get around this (see below).

You can find an explanation of [blacklisted](https://www.khronos.org/webgl/wiki/BlacklistsAndWhitelists) cards/GPU’s for Chrome. As of January 2013 the “blacklisted” Chrome GPU’s are as follows; some may be removed from the list later.

**All operating systems**

- NVIDIA GeForce FX Go5200

**Windows**

- Intel GMA 945
- ATI FireMV 2400

**Mac**

- ATI Radeon HD2400
- ATI Radeon 2600 series
- ATI Radeon X1900
- ATI Radeon HD 6490M on OS X 10.6
- GeForce 7300 GT

**Linux**

- AMD/ATI cards
- Nvidia QuadroFX 1500
- Nvidia cards with Nouveau drivers
- Nvidia cards with Nvidia drivers older than 295
- Optimus dual-GPU configurations
- Intel for Mesa drivers earlier than 7.9 (just update drivers)

#### The Work-around

To work around this it is easiest done in Chrome by typing "about:flags" in the address bar, it will open a page. On this page find "Override software rendering list" in the list and click "enable". Then look for and click the "relaunch google chrome" button or close all chrome browser windows and restart/reload Chrome.

In Firefox type “about:flags” in the address bar. (On this page there is a search input available) Search in this for “force-enabled”. Double click on both layers.acceleration.force-enabled and webgl.force-enabled which will set their value true. Then close all firefox browser windows and restart/reload firefox.

#### Extra Trouble

Graphics drivers must be working, some graphics cards are not fully compatible with some operating systems. In the case of Linux OS make sure is fully updated ie. Intel Mesa drivers should be higher than 7.9 otherwise it will default to software rendering.

#### Diagnose your GPU in Chrome

You can diagnose what’s happening by typing "chrome://gpu" in the location bar. You can also see your driver version in here and other details.

If webgl is enabled then you should get a graphics feature status, ie. - Canvas: Hardware accelerated - WebGL: Hardware accelerated - WebGL multisampling: Hardware accelerated - Flash 3D: Hardware accelerated - Flash Stage3D: Hardware accelerated

The GL_RENDERER also should have the name of your GPU, otherwise if its not working correctly it may have something like “Software Rasterizer” and will be really slow. In this case again check your drivers are up to date.

## Available Interactives

- [Action Menu](interactives/action-menu/index.html)
- [Available Menu Items](interactives/available-menu-items/index.html)
- [Awful Calculator](interactives/awful-calculator/index.html)
- [Base Calculator](interactives/base-calculator/index.html)
- [Big Number Calculator](interactives/big-number-calculator/index.html)
- [Binary Cards](interactives/binary-cards/index.html)
- [Caesar Cipher](interactives/caesar-cipher/index.html)
- [Checksum Calculator](interactives/checksum-calculator/index.html)
  - [GTIN-13 Checksum Calculator](interactives/checksum-calculator-gtin-13/index.html)
- [Close Window](interactives/close-window/index.html)
- [CMY Colour Mixer](interactives/cmy-mixer/index.html)
- [Colour Matcher](interactives/colour-matcher/index.html)
- [Compression Comparer](interactives/compression-comparer/index.html)
- [Confused Buttons](interactives/confused-buttons/index.html)
- [Date Picker](interactives/date-picker/index.html)
- [Deceiver](interactives/deceiver/index.html)
- [Delay Analyser](interactives/delay-analyser/index.html)
- [Delayed Checkbox](interactives/delayed-checkbox/index.html)
- [Frequency Analysis](interactives/frequency-analysis/index.html)
- [High Score Boxes](interactives/high-score-boxes/index.html)
- [Image Bit Comparer](interactives/image-bit-comparer/index.html)
  - [Change bit mode](interactives/image-bit-comparer/index.html?change-bits=true)
- [MIPS Assembler](interactives/mips-assembler/index.php)
- [MIPS Simulator](interactives/mips-simulator/index.php)
- [No Help](interactives/no-help/index.html)
- [Number Generator](interactives/number-generator/index.html)
- [Packet Attack](interactives/packet-attack/index.html)
- [Packet Attack Level Creator](interactives/packet-attack-level-creator/index.html)
- [Parity Trick](interactives/parity/index.html)
  - [Setting parity only](interactives/parity/index.html?mode=set)
  - [Detecting errors only](interactives/parity/index.html?mode=detect)
  - [Sandbox mode](interactives/parity/index.html?mode=sandbox)
- [Payment Interface](interactives/payment-interface/index.html)
- [Pixel Viewer](interactives/pixel-viewer/index.html)
- [Python Interpreter](interactives/python-interpreter/index.html)
- [Regular Expression Filter](interactives/regular-expression-filter/index.html)
- [Regular Expression Search](interactives/regular-expression-search/index.html)
- [RGB Colour Mixer](interactives/rgb-mixer/index.html)
- [RSA Key Generator](interactives/rsa-key-generator/index.html)
- [RSA Encrypter](interactives/rsa-no-padding/index.html) (no padding)
- [RSA Decrypter](interactives/rsa-no-padding/index.html?mode=decrypt) (no padding)
- [Run Length Encoding](interactives/run-length-encoding/index.html)
- [SHA2](interactives/sha2/index.html)
- [Searching Algorithms](interactives/searching-algorithms/index.html)
- [Sorting Algorithm Comparison](interactives/sorting-algorithm-comparison/index.html)
- [Sorting Algorithms](interactives/sorting-algorithms/index.html)
- [Trainsylvania](interactives/trainsylvania/index.html)
- [Trainsylvania Planner](interactives/trainsylvania-planner/index.html)
- [Unicode Binary](interactives/unicode-binary/index.html)
- [Unicode Character](interactives/unicode-chars/index.html)
- [Unicode Length](interactives/unicode-length/index.html)
