var moment = require('moment');

function replaceTimestamp(str) {
  return str.replace(/Timestamp (\d+)\|(\d+)/g, '{ "$timestamp": { "t": $1, "i": $2 } }');
}

function replaceMinKey(str) {
  return str.replace(/MinKey/g, '{ "$minKey": 1 }');
}

function replaceMaxKey(str) {
  return str.replace(/MaxKey/g, '{ "$maxKey": 1 }');
}

function replaceNumberLong(str) {
  var match = str.match(/\s\d{10,}/g);
  match && match.forEach(function (m) {
    var n = m.trim();
    if (+n > 2147483647) {
      str = str.replace(n, '{ "$numberLong": "' + n + '" }');
    }
  });
  return str;
}

function replaceObjectId(str) {
  return str.replace(/ObjectId\('([0-9abcdef]{24})'\)/g, '{ "$oid": "$1" }');
}

function replaceRegEx(str) {
  var regex = /\/(.+?)\/([gims]{0,4})/g;
  var match;

  while ((match = regex.exec(str)) !== null) {
    var m1 = match[1].replace(/"/g, '\\\"');
    str = str.replace(match[0], '{ "$regex": "'+ m1 +'", "$options": "'+ match[2] +'" }')
  }
  return str;
}

function replaceDate(str) {
  var regex = /new Date\((\d+)\)/g;
  var match;
  while ((match = regex.exec(str)) !== null) {
    var t = moment(parseInt(match[1]));
    str = str.replace(match[0], '{ "$date": "' + t.toISOString() + '" }')
  }
  return str;
}

function replaceBinData(str) {
  return str.replace(/BinData\((\d+), ([0-9ABCDEF]+)\)/g, '{ "$binary": "$2", "$type": "$1" }');
}

var replace = module.exports = function(str) {

  str = replaceTimestamp(str);
  str = replaceMaxKey(str);
  str = replaceMinKey(str);
  str = replaceNumberLong(str);
  str = replaceObjectId(str);
  str = replaceRegEx(str);
  str = replaceDate(str);
  str = replaceBinData(str);
  
  return str;
}