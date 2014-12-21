# mongodb-log2ejson

This little helper module converts MongoDB native types printed in log files into [extended JSON strict format](http://docs.mongodb.org/manual/reference/mongodb-extended-json/). 

When MongoDB (version 2.8.0 and below) prints certain types to log files (e.g. for slow queries), it uses a custom format that is neither strict eJSON nor shell syntax. This module parses the different types and converts them to strict eJSON.

See also ticket [SERVER-16618](https://jira.mongodb.org/browse/SERVER-16618) in MongoDB's Jira.

### Usage

```js

var parser = require('mongodb-log2ejson');

var parsed = parser('{ created: new Date(1388534400000) }');
console.log(parsed);

// output: { created: { "$date": "2014-01-01T00:00:00.000Z" } }

```

### Test

run `mocha`.

