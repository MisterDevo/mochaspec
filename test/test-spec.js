var assert = require('assert');
var test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

// change this line to run locally
var isLocalSeleniumServer = false;

var local = {
      server: 'http://127.0.0.1:4444/wd/hub',
      desiredCapabilities: { browserName: 'firefox' }
    };
var options = isLocalSeleniumServer ? local : require('../trav-sl-opt.js');

// change this line to adress your app
options.baseUrl = 'https://www.google.com';


test.describe('End To End tests example', function() {

    // 90s for iphone bootstrap
    this.timeout(90000);
    var client = {};

    test.before(function(){
        client = new webdriver.Builder()
                          .withCapabilities(options.desiredCapabilities)
                          .usingServer(options.server)
                          .build();
    });


    test.describe('Fake Google Test example', function() {

        test.it('should have the right title', function () {
            client.get(options.baseUrl);
            client.wait(client.getTitle(), 10000)
              .then(function(title){
                  assert.equal(title, 'Google');
              });
        });

    });

    var passed = true;
    test.afterEach(function() {
        if(this.currentTest.state === 'failed') {
          passed = false;
        }
    });

    test.after(function(done) {
        if(options.saucelabs){
            client.getSession().then(function (sessionid){
              options.saucelabs.updateJob( sessionid.id_, { passed: passed }, function(err, res) {
                options.saucelabs.stopJob( sessionid.id_, { }, function(err, res) {
                  client.quit();
                  done();
                });
              });
            });
        } else {
            client.quit();
            done();
        }
    });

});
