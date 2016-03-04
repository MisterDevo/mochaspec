var assert = require('assert');
var test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver');

var options = require('./trav-sl-opt.js');
options.baseUrl = 'https://www.google.com';

// var options = {
//   server:'http://127.0.0.1:4444/wd/hub',
//   desiredCapabilities:{browserName:'firefox'},
//   baseUrl:'https://www.google.com'
// };

test.describe('End To End tests example', function() {

    this.timeout(60000);
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
                if(err){
                  //retry
                  options.saucelabs.updateJob( sessionid.id_, { passed: passed }, function(err, res) {});
                }
              });
              client.quit();
              done();
            });
        } else {
            client.quit();
            done();
        }
    });

});
