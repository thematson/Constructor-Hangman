var Word = require("./word");
var inquirer = require("inquirer");
var guessesLeft = 8;
var lettersGuessed = [];

var wordArray = ["burrito", "quesadilla", "guacamole", "chimichanga", "chorizo", "salsa verde", "chile con queso", "tacos al pastor"];

var random = Math.floor(Math.random() * 8);

var answerWord = wordArray[random];

var blankWord = [];

console.log(answerWord);

var answerLetterArray = answerWord.split("");

console.log(answerLetterArray);

// for (var b = 0; b < answerLetterArray.length; b++){
//     if (answerLetterArray[b] !== " ") {
//         blankWord.push("_  ");
//     } else {
//         blankWord.push(" ");        
//     }
// }

// console.log(blankWord.join(""));


var hangmanWord = new Word(answerWord);


for (var j = 0; j<answerLetterArray.length; j++){
    hangmanWord.addLetters(answerLetterArray[j]);
}

console.log(hangmanWord);
console.log('the 3rd letter is ' + hangmanWord.keyWord[2].letter);


// console.log(hangmanWord.keyWord[0].letter);
for (var k = 0; k<hangmanWord.keyWord.length; k++) {
    blankWord.push(hangmanWord.keyWord[k].letter);
}
console.log("blankword is " + blankWord.join(", "));
function game(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'letter',
            message: "Please guess a letter!",        
            
        }

    ])
    .then(function(guess) {
        console.log(guess.letter);
            //replaces the _ with correct letters
            var sub = answerLetterArray.indexOf(guess.letter);
            if (sub !== -1) {
                for (z=0; z<answerLetterArray.length; z++) {
                    if (answerLetterArray[z] == guess.letter) {
                        blankWord[z] = guess.letter;
                        console.log(blankWord.join('  '));
                        console.log("string " + blankWord.toString());
                        console.log("answer " +answerLetterArray.toString());
            //if all letters are chosen correctly, calls winner function
                        if (blankWord.toString() == answerLetterArray.toString()) {
                            console.log('you win');
                            // winner();
                        }
                        }
                    }
                }
            //records wrong guesses	
            else {	
                guessesLeft--;
                console.log("NO!!!!! Number of Wrong Guesses Remaining : " + guessesLeft);
                console.log(blankWord.join('  '));
            };

        if (guess.letter !== "") {
            lettersGuessed.push(guess.letter);
            console.log(lettersGuessed);
            game();
        }
    });
}

game();