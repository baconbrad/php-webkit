var phpBridge = require('../lib/bridge');
var demand = require('must');

describe('php-nw Bridge.js', function () {
  it('should exist', function () {
    demand(phpBridge).to.exist();
  });
});

