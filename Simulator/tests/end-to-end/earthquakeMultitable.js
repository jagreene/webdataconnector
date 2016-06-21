var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var should = require('should');
var express = require("express");
var path = require("path");

var app = express();

// run once before tests
describe('Earthquake Multitable Connector', function(){
  var driver;
  var server;
  before(function(done) {
    this.timeout(60000);
    //Spin up file server
    app.use(express.static(path.join(__dirname, "../../../")));
    server = app.listen(8888);

    //create driver
    driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.manage().timeouts().pageLoadTimeout(60000);
    // open simulator page
    driver.get('http://localhost:8888/Simulator').then(function() {
      done();
    });
  });

  // run it once after tests
  after(function(done) {
    server.close();
    driver.quit().then(done);
  });

  it("Should be Able to Enter a Url", function(done){
    let addressBar;
    const wdcUrl = '../Examples/html/earthquakeMultitable.html';
    driver.findElement({id:'address-input'})
      .then(function (element) {
        addressBar = element;
        return addressBar.clear();
      })
      .then(function() {
        return addressBar.sendKeys(wdcUrl);
      })
      .then(function() {
        return addressBar.getAttribute("value");
      })
      .then(function(url) {
        url.should.be.equal(wdcUrl);
        done();
      });
  })

  it("Should be Able to Enter Interactive Mode", function(done){
    this.timeout(5000);
    let simulatorWindow = driver.getWindowHandle()
    driver.findElement({ id: 'interactive-btn' })
      .then(function (btn) {
        return btn.click();
      })
      .then(function() {
        return driver.switchTo().window('wdc');
      })
      .then(function() {
        return driver.wait(until.elementLocated({ id: 'submitButton' }), 1000);
      })
      .then(function(btn) {
        return btn.click();
      })
      .then(function(btn) {
        driver.switchTo().window(simulatorWindow);
        done();
      });
  })

  it("Should Have Set to WDC Attrs", function(done){
    const correctName = 'USGS Earthquake Feed';
    driver.findElement({id:'connectionName'})
      .then(function(field) {
        return field.getAttribute("value");
      })
      .then(function(connectionName) {
        connectionName.should.be.equal(correctName);
        done();
      });
  })

  it("Should Have Multiple Preview Tables", function(done){
    driver.findElements({className: 'table-preview-Column'})
      .then(function (elements) {
        elements.length.should.be.equal(2);
        done()
      });
  })

  it("Should Fetch Data", function(done){
    this.timeout = 5000;
    driver.findElement({ className: 'fetch-btn' })
      .then(function (btn) {
        return btn.click();
      })
      .then(function () {
        return driver.wait(until.elementsLocated({ className: 'data-row' }), 5000);
      })
      .then(function (elements) {
        elements.length.should.be.above(0);
        done();
      });
  })
})
