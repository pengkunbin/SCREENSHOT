const puppeteer = require("puppeteer");

// 获取命令行参数
const args = process.argv.slice(2);

// 目标网址链接
const url = args[0];

// 生成的图片名称（绝对路径）
const imgPath = args[1];

// 脚本延时时间
const delay = args[2] || 5000;

// 如果有某一值为空
if (!url || !imgPath) {
  throw "command line params error";
}

/**
 * @description 超时函数
 * @param {string} delay ms
 */
function timeOut(delay) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("network timeout"));
    }, delay);
  });
}

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
        return;
      }
    }, 100);
  });
};

// 自动执行——截屏主函数
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  try {
    await Promise.race([page.goto(url), timeOut(delay)]);
  } catch (e) {
    process.exit(e);
  }
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await autoScroll(page)
  await page.screenshot({
    path: imgPath,
    fullPage: true,
  });
  await browser.close();
})();
