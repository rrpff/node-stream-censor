require("chai").should();

var censor = require("../"),
    Path = require("path"),
    es = require("event-stream"),
    fs = require("fs"),
    wordstream = require("wordstream");

var goodwords = Path.join(__dirname, "words.txt"),
    badwords = Path.join(__dirname, "badwords.txt");

describe("stream-censor", function(){

    it("should remove values in the stream it's passed from streams piped to it", function(done){
        var good = fs.createReadStream(goodwords).pipe(wordstream()),
            bad = fs.createReadStream(badwords).pipe(wordstream());

        good.pipe(censor(bad))
            .pipe(es.writeArray(function(err, res){
                res.should.deep.equal(["have", "a", "day"]);
                done();
            }));
    });

    it("should return false if a stream isn't passed", function(){
        censor().should.equal(false);
        censor([1, 2, 3]).should.equal(false);
        censor(fs.createReadStream(goodwords)).should.not.equal(false);
    });

});