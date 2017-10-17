var Letter = require("./letter");

var Word = function(theWord){
    this.theWord = theWord;
    this.keyWord = [];

    this.addLetters = function(l) {
        console.log(this.keyWord.guess);

        if (this.keyWord.guess === false) {
            this.keyWord.push('_ ');
        }
        
        this.keyWord.push(new Letter(l));
        
    };
};

module.exports = Word;