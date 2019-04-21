$(document).ready(function() {
    var wordChoice = ["balloon", "crabapple", "sandwiches", "ribbon", "bird", "information", "trapeze", "nosedive",];
    var ChosenWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];
    var answerArray = [];
    var wrongGuesses = [];
    for (var i=0; i<ChosenWord.length; i++) answerArray[i] = "-";
    var remainingGuesses = 9;
    var unguessedLetters = ChosenWord.length;
    var pardons = 0;
    var executions = 0;
    var answerArrayText = document.getElementById("answer-length");
    var unguessedLettersText = document.getElementById("unguessed-letters");
    var remainingGuessesText = document.getElementById("remaining-guesses");
    var wrongGuessesText = document.getElementById("wrong-guesses");
    var pardonsText = document.getElementById("pardons");
    var executionsText = document.getElementById("executions");
    var gallows = $('img');
    function newGame() {
        ChosenWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];
        answerArray = [];
        wrongGuesses = [];
        remainingGuesses = 9;
        unguessedLetters = ChosenWord.length;
        answerArray = Array(ChosenWord.length).fill("-");
        $("#answer-length, #unguessed-letters, #remaining-guesses, #wrong-guesses").empty();
        $('#wrong-guesses').text('-');
        $('#remaining-guesses').text('9');
        $('img').animate({height: "100%"});
    };           
    answerArrayText.textContent = answerArray[i];               
    $("#newGameButton").click(function() {
        newGame();
    });           
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o","p", "q", "r","s", "t", "u", "v", "w", "x", "y", "z"];
    document.onkeyup = function(event) {
        if (alphabet.includes(event.key)) {
            var enterGuess = event.key;
            checkGuess();
        } else {
            alert('Please select a valid letter.');
        };
        function checkGuess() {
            if(alphabet.includes(enterGuess) && !wrongGuesses.includes(enterGuess)){ 
                for (var j = 0; j < ChosenWord.length; j++) {
                    if (!ChosenWord.includes(enterGuess)) {
                        wrongGuesses.push(enterGuess);
                        wrongGuessesText.textContent = wrongGuesses;
                        console.log(enterGuess);
                        remainingGuesses--;
                        remainingGuessesText.textContent = remainingGuesses;
                        gallows.animate({height: "+=10px"})
                        break
                    } else if ((ChosenWord[j] === enterGuess) && (!answerArrayText.textContent.includes(enterGuess))) {
                        answerArray[j] = enterGuess;
                        unguessedLetters--;
                    };
                };    
            answerArrayText.textContent = answerArray.join("");
            unguessedLettersText.textContent = (unguessedLetters);
            };
            if (unguessedLetters<1){
                answerArrayText.textContent = ChosenWord;
                setTimeout(function(){confirmationWin()}, 100);
                function confirmationWin() {
                    var t = confirm("Congrautlations! You've survived. Want to risk your neck again?");
                    if (t == true) {newGame()};
                };
                pardons++;
                pardonsText.textContent = pardons;
            };
            if (remainingGuesses<1){
                setTimeout(function(){confirmationLoss()}, 100);
                function confirmationLoss() {
                    var r = confirm ("The word was " + ChosenWord + ". You Have Been Hanged for Guessing Poorly");
                    if (r == true) {newGame()};
                };
                executions++;
                executionsText.textContent = executions;
            };
        };
    };
});