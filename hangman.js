var Word = require("./word");
var inquirer = require("inquirer");
var prompt = inquirer.createPromptModule();
var guessesLeft = 8;
var lettersGuessed = [];
var wordArray = ["burrito", "quesadilla", "guacamole", "chimichanga", "chorizo", "salsa verde", "chile con queso", "tacos al pastor"];
var random = Math.floor(Math.random() * 8);
var answerWord = wordArray[random];
var blankWord = [];
var answerLetterArray = answerWord.split("");
var hangmanWord = new Word(answerWord);


for (var j = 0; j<answerLetterArray.length; j++){
    hangmanWord.addLetters(answerLetterArray[j]);
}


for (var k = 0; k<hangmanWord.keyWord.length; k++) {
    if (hangmanWord.keyWord[k].letter !== " ") {
        blankWord.push("_ ");
    } else {
        blankWord.push(" ");
    }
}

console.log(blankWord.join("  "));

function game(){
    prompt([
        {
            type: 'input',
            name: 'letter',
            message: "Please guess a letter!"
        }

    ])
    .then(function(guess) {
        
        console.log(guess.letter);
        
            var sub = answerLetterArray.indexOf(guess.letter);
            if (sub !== -1) {
                for (z=0; z<answerLetterArray.length; z++) {
                    if (answerLetterArray[z] == guess.letter) {
                        blankWord[z] = guess.letter;
                       
                        if (blankWord.toString() == answerLetterArray.toString()) {
                            console.log(blankWord.join('  '));                            
                            console.log('you win');
                            // winner();
                        }
                        }
                    }
                    console.log(blankWord.join('  '));
                    
                } else if ((sub === -1) && (lettersGuessed.indexOf(guess.letter) === -1)) {	
                guessesLeft--;
                console.log(" ");
                console.log("NO!!!!! Number of Wrong Guesses Remaining : " + guessesLeft);
                console.log(blankWord.join('  '));
                if (guessesLeft === 0) {
                    prompt([
                        {
                            type: 'confirm',
                            name: 'keepPlaying',
                            message: 'No more guesses left :(. Would you like to play again?',
                            default: false
                        }
                    ]).then(function(user) {
                        if(user.keepPlaying===true){
                            guessesLeft = 8;
                            lettersGuessed = [];
                            console.log('game was called feom 104');
                            game();
                        } else {
                            console.log("Thanks for playing bozo");
                        } 
                    });
                }
            };

        if (guess.letter !== "") {
            if (lettersGuessed.indexOf(guess.letter) === -1) {
            lettersGuessed.push(guess.letter);
            } else {
                console.log('');
                console.log('');                
                console.log('Sorry, you alreade guessed that letter. You lose a guess.');
                guessesLeft--;
                console.log('');
                console.log('Wrong Guesses Remaining : ' + guessesLeft);
                console.log(blankWord.join('  '));                
                
                if (guessesLeft === 0) {
                    prompt([
                        {
                            type: 'confirm',
                            name: 'keepPlaying',
                            message: 'No more guesses left :(. Would you like to play again?',
                            default: false
                        }
                    ]).then(function(user) {
                        if(user.keepPlaying){
                            guessesLeft = 8;
                            lettersGuessed = [];
                            console.log('game was called from 135');
                            game();
                        } else {
                            console.log("Thanks for playing bozo");
                        } 
                    });
                }
            }
            game();
        }
    });
}
console.log('game was called from 152');
game();