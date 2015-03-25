var through = require("through"),
    wordstream = require("wordstream"),
    fs = require("fs");

var censor = module.exports = function(stream){
    if(!stream || !stream.pipe) return false;

    var values = [],
        blacklist = [];

    // Add blacklisted values in stream to array
    stream.on("data", blacklist.push.bind(blacklist));

    return through(function(value){
        // Store values if blacklist stream isn't done
        if(stream.readable)
            values.push(value);
        // Queue if blacklist didn't contain them
        else if(blacklist.indexOf(value) === -1)
            this.queue(value);
    }, function(){
        // Flush when blacklist ends
        stream.on("end", function(){
            var res = without(values, blacklist);
            res.forEach(this.queue);
            this.queue(null);
        }.bind(this));
    });
}

var without = function(arr1, arr2){
    return arr1.reduce(function(res, item){
        if(arr2.indexOf(item) === -1)
            res.push(item);

        return res;
    }, []);
}