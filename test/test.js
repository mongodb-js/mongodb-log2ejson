var assert = require('assert');

var mdb_replace = require('../index');

describe('mongodb-replace', function () {
  
  it('should parse ObjectId', function () {
    var s = mdb_replace('{ oid: ObjectId(\'87654f73c737a19e1d112233\') }')
    assert.equal(s, '{ oid: { "$oid": "87654f73c737a19e1d112233" } }')
  });

  it('should parse Date', function () {
    var s = mdb_replace('{ date: new Date(1388534400000) }')
    assert.equal(s, '{ date: { "$date": "2014-01-01T00:00:00.000Z" } }')
  });

  it('should parse multiple dates in one line', function () {
    var s = mdb_replace('{ start: new Date(1388534400000), end: new Date(1388534406000) }')
    assert.equal(s, '{ start: { "$date": "2014-01-01T00:00:00.000Z" }, end: { "$date": "2014-01-01T00:00:06.000Z" } }')
  });

  it('should parse Timestamp', function () {
    var s = mdb_replace('{ ts: Timestamp 0|0 }')
    assert.equal(s, '{ ts: { "$timestamp": { "t": 0, "i": 0 } } }')
  });

  it('should parse RegEx', function () {
    var s = mdb_replace('{ regex: /foo/gi }');
    assert.equal(s, '{ regex: { "$regex": "foo", "$options": "gi" } }')
  });

  it('should parse MaxKey', function () {
    var s = mdb_replace('{ val: MaxKey }')
    assert.equal(s, '{ val: { "$maxKey": 1 } }')
  });

  it('should parse MinKey', function () {
    var s = mdb_replace('{ val: MinKey }')
    assert.equal(s, '{ val: { "$minKey": 1 } }')
  });

  it('should parse BinData', function () {
    var s = mdb_replace('{ bin: BinData(3, 0123456789ABCDEFFEDCBA9876543210) }')
    assert.equal(s, '{ bin: { "$binary": "0123456789ABCDEFFEDCBA9876543210", "$type": "3" } }')
  });

  it('should parse NumberLong', function () {
    var s = mdb_replace('{ long: 9223372036854775807 }')
    assert.equal(s, '{ long: { "$numberLong": "9223372036854775807" } }')
  });

  it('should parse multiple NumberLong in one line', function () {
    var s = mdb_replace('{ long: { $in: [ 9223372036854775807, 9223372036854775806 ] } }')
    assert.equal(s, '{ long: { $in: [ { "$numberLong": "9223372036854775807" }, { "$numberLong": "9223372036854775806" } ] } }')
  });

  it('should leave short numbers alone', function () {
    var s = mdb_replace('{ short: 1234567 }')
    assert.equal(s, '{ short: 1234567 }')
  })

});
