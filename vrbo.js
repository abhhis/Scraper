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
    vrbo();
}
if (!casper.cli.has("url")) {
  casper.echo("\nUsage:casperjs verbo.js --url=http://YourUrl.com/").exit();
}
function vrbo() {
    casper.start(mainUrl).then(function scarp() {
        this.echo((this.fetchText(x('//*[@id="content"]/div/div[1]/h1'))).trim());
        this.echo((this.fetchText(x('//*[@id="listing-bigtop"]/div[2]/div/div/h4/b'))).trim());
    });
    casper.then(function render() {
        this.evaluate(function check() {
            window.__utils__.echo(document.head.querySelector("[name=Location]").content);
        });
    })
    casper.then(function() {
        if (this.exists(x('//*[@id="ownermap-profile"]/div[2]/ul/li[1]/i'))) {
            this.echo((this.fetchText(x('//*[@id="ownermap-profile"]/div[2]/ul/li[1]/i'))).trim());
            this.echo((this.fetchText(x('//*[@id="ownermap-profile"]/div[2]/ul/li[1]/span'))).trim());
        }
    })
    casper.then(function() {
        if (this.exists(x('//*[@id="ownermap-profile"]/div[2]/ul/li[2]/span'))) {
            this.echo((this.fetchText(x('//*[@id="ownermap-profile"]/div[2]/ul/li[2]/span'))).trim());
        }
    })
    casper.run();
};//end
