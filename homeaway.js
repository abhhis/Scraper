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
    homeAway();
}
if (!casper.cli.has("url")) {
    casper.echo("\nUsage:casperjs homeaway.js --url=http://YourUrl.com/").exit();
}

function homeAway() {
    casper.start(mainUrl).then(function scarp() {

        this.echo((this.fetchText(x('//*[@id="wrapper"]/div[2]/div[2]/div[1]/div[2]/h1/span'))).trim());
        this.echo((this.fetchText(x('//*[@id="wrapper"]/div[2]/div[2]/div[1]/div[5]/div/div[2]/div[9]/section[1]/div/div[3]/div[2]/div/div[1]/div[2]/div[1]/div/span'))).trim());

    });
    casper.then(function render() {
        this.evaluate(function check() {
            window.__utils__.echo(require('pageData').listing.address.city);
            window.__utils__.echo(require('pageData').listing.address.stateProvince);
            window.__utils__.echo(require('pageData').listing.address.country);
            for (var i = 0; i < require('pageData').listing.contact.phones.length; i++) {
                window.__utils__.echo(require('pageData').listing.contact.phones[i].phoneNumber);
            }
        });
    })
    casper.run();
};
