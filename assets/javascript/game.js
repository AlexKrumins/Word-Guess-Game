
$(document).ready(function() {
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o","p", "q", "r","s", "t", "u", "v", "w", "x", "y", "z"];    
    var wordChoice = ["balloon", "crabapple", "sandwiches", "ribbon", "bird", "information", "trapeze", "nosedive",];
    var ChosenWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];
    var enterGuess = "";
    var answerArray = [];
    var wrongGuesses = [];
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
    for (var i=0; i<ChosenWord.length; i++) {
        answerArray[i] = "-";
    };
    function newGame() {
        ChosenWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];
        answerArray = [];
        wrongGuesses = [];
        remainingGuesses = 9;
        unguessedLetters = ChosenWord.length;
        answerArray = Array(ChosenWord.length).fill("-");
        answerArrayText.textContent = answerArray[i];
        $("#gameStatus").text("Only " + unguessedLetters + " letters left to go...");
        $("#unguessed-letters, #remaining-guesses, #wrong-guesses").empty();
        $("#answer-length").text(answerArray); 
        $('#wrong-guesses').text('-');
        $('#remaining-guesses').text('9');
        $('img').animate({height: "100%"});
    };
    

    $("#newGameButton").click(function() {
        newGame();
    });
    
    for (var i = 0; i < alphabet.length; i++) {
        var letterBtn = $("<button>");
        letterBtn.addClass("letter-button letter letter-button-color");
        letterBtn.data("letter", alphabet[i]);
        letterBtn.text(alphabet[i].toUpperCase());
        $("#buttons").append(letterBtn);
    };
    $('.letter-button').click(function() {
        enterGuess = (this.data);
        checkGuess();
    });
    document.onkeyup = function() {
        if (alphabet.includes(event.key)) {
            console.log("press");
            enterGuess = event.key;
            checkGuess();
        } else {
            alert('Please select a valid letter.');
        };
    };

    function checkGuess() {
        if(((enterGuess === "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o","p", "q", "r","s", "t", "u", "v", "w", "x", "y", "z")) && (!wrongGuesses.includes(enterGuess))) {
            console.log('bust');
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
            $("#gameStatus").text("Congratulations! You live to see another day.")
            setTimeout(function(){confirmation()}, 2500);
            function confirmation() {
                var t = confirm("You've survived. Want to risk your neck again?");
                if (t == true) {newGame()};
            };
            pardons++;
            pardonsText.textContent = pardons;
        };
        if (remainingGuesses<1){
            var r = confirm ("You Have Been Hanged for Guessing Poorly");
            if (r == true) {newGame()};
            executions++;
            executionsText.textContent = executions;
        };
    };
});