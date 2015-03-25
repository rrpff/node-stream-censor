# node-stream-censor

Remove values in stream passed from streams piped.

```sh
$ npm install --save stream-censor
```

```js
var censor = require("stream-censor");

var badvalues = fs.createReadStream("./badvalues.txt");

fs.createReadStream("./goodvalues.txt")
    .pipe(censor(badvalues))
    .on("data", console.log);

// -> no bad things will make it through...
```