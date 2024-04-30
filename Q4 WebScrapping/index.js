const puppeteer = require('puppeteer');
const fs = require("fs");
(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });
    const page = await browser.newPage();
    const url = 'https://blog.ankitsanghvi.in/'
    // Navigate the page to a URL
    await page.goto(url);
    var Blogs = await page.$$(
        "Article"
    );
b=[]    
for (let i = 0; i < Blogs.length; i++) {
            Blogs = await page.$$(
                "Article"
            );
    await Promise.all([
        Blogs[i].click(),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);
    a={};
        const element = await page.$('.post-full-header');
        if (element === null) {
            console.log('Element not found.');
        } else {
            try {
                a.header = await page.evaluate(
                    (el) => el.querySelector("h1").innerText,
                    element
                );
            } catch (error) { }
        } 
        console.log(a)

        if (element === null) {
            console.log('Element not found.');
        } else {
            try {
                a.subtitle = await page.evaluate(
                    (el) => el.querySelector("p").innerText,
                    element
                );
            } catch (error) { }
        } 
        console.log(a)
        const el = await page.$('.post-content');
        if (el === null) {
            console.log('Element not found.');
        } else {
            try {
                a.link = await page.evaluate(
                    (el) => el.querySelector("a").getAttribute('href'),
                    el
                );
            } catch (error) { }}
            console.log(a)
            a.img=url;
            const e = await page.$('.post-full-image');
            if (e === null) {
                console.log('Element not found.');
            } else {
                try {
                    a.img += await page.evaluate(
                        (e) => e.querySelector("img").getAttribute('src'),
                        e
                    );
                } catch (error) { }}
                console.log(a)
                content=await page.$eval('*', (el) => {
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNode(el);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    return window.getSelection().toString();
                });
                a.content=(content.replace(/,/g, "."))
                console.log(a)
                b.push(a);
                
                
                
                fs.appendFile(
                    "final.csv",
                    `${a.header},${a.subtitle},${a.link},${a.img},${a.content.replace(/,/g, ".")}\n`, function (err) {
                        if (err) throw err;
                      }
                    );

                await page.goto(url)
            }
            console.log(b)
            let dat=JSON.stringify({"sagar":b});
fs.writeFile("data.json", dat, (error) => {
  if (error) {
    console.error(error);
    throw error;
}});
await browser.close();      
})();
