var casper = require('casper').create({
    logLevel: "info", // Only "info" level messages will be logged
    verbose: true,
    pageSettings: {
        javascriptEnabled: true,
        loadImages: false, // The WebPage instance used by Casper will
        loadPlugins: true, // use these settings
    }
});
var mainUrl = casper.cli.get("url");
var x = require('casper').selectXPath;
casper.options.viewportSize = { width: 1360, height: 768 };
casper.userAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36');
phantom.cookiesEnabled = true;
if (casper.cli.has("url")) {
    flipkey();
}
if (!casper.cli.has("url")) {
  casper.echo("\nUsage:casperjs flipkey.js --url=http://YourUrl.com/").exit();
}
function flipkey(){casper.start(mainUrl).then(function scarp() {
    this.echo((this.fetchText(x('//*[@id="pdp-title"]/h1'))).trim());
    this.echo((this.fetchText(x('//*[@id="pdp-owner-box"]/div/h3'))).trim());
    this.echo((this.fetchText(x('//*[@id="pdp-owner-box"]/div/div[3]/span/span[2]'))).trim());
});
casper.then(function render() {
    this.evaluate(function check() {
        window.__utils__.echo(document.querySelector('meta[property="og:locality"]').content);
    });
})
casper.run();
};