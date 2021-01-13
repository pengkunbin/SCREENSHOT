const puppeteer = require("puppeteer");

// 获取命令行参数
const args = process.argv.slice(2);

const url = args[0];
const imgPath = args[1];

// 如果有某一值为空
if(!url || !imgPath){
    throw('command line params error')
}

// 自动执行——截屏主函数
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await autoScroll(page);

  await page.screenshot({
    path: imgPath,
    fullPage: true,
  });

  await browser.close();
})();

// 滚动截屏函数，解决动态高度问题
const autoScroll = function (page) {
  return page.evaluate(() => {
    return new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};
