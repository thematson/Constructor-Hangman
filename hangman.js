//requirements
var Word = require("./word");
var inquirer = require("inquirer");
var prompt = inquirer.createPromptModule();

//let's get some variables
//you have wrong guesses available
var guessesLeft = 8;
var lettersGuessed = [];
//the answers
var wordArray = ["burrito", "quesadilla", "guacamole", "chimichanga", "chorizo", "salsa verde", "chile con queso", "tacos al pastor"];
//let's pick a random letter
var random = Math.floor(Math.random() * 8);
var answerWord = wordArray[random];
var blankWord = [];
var answerLetterArray = answerWord.split("");
var hangmanWord = new Word(answerWord);

//the function from the word constructor
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
console.log("");
console.log(blankWord.join("  "));

//game play
function game(){
    prompt([
        {
            type: 'input',
            name: 'letter',
            message: "Please guess a letter! (Hint: it's Mexican/Tex-Mex food)"
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
                    //if no guesses left.. call this function 
                    noGuessesLeft();
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
                    //if no guesses left.. call this function 
                    noGuessesLeft();
                }
            }
            if (guessesLeft > 0) {
                game();
            }    
        }
    });
}
console.log('');
game();
function noGuessesLeft() {
    prompt([
        {
            type: 'confirm',
            name: 'keepPlaying',
            message: 'No more guesses left :(. Would you like to play again?',
            default: false
        }
    ]).then(function(user) {
        if (user.keepPlaying === true) {
            guessesLeft = 8;
            lettersGuessed = [];
            console.log('');
            game();
        }
        else {
            console.log("Thanks for playing bozo");
            process.exit();
        }
    });
}
