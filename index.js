const puppeteer = require("puppeteer");

// 获取命令行参数
const args = process.argv.slice(2);

const url = args[0];
const imgPath = args[1];

// 如果有某一值为空
if (!url || !imgPath) {
  throw "command line params error";
}

// 自动执行——截屏主函数
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
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
const autoScroll = async function (page) {
  return page.evaluate(() => {
      const totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          return
        }
      }, 100);
    });
};
