# screenshot

Capture screenshots using [puppeteer](https://developers.google.com/web/tools/puppeteer/get-started).

## Installation
1. Download [nodejs](https://nodejs.org/en/) (LTS) schedule
2. With npm do
```
git clone https://github.com/pengkunbin/SCREENSHOT.git
cd SCREENSHOT
npm install
```

## Example

Capture a screenshot of ghub.io(Terminal):
```
cd SCREENSHOT

// Image path is absolute path
node index.js https://github.com/ github.png

// add delay timer(ms)
node index.js https://github.com/ github.png 3000
```