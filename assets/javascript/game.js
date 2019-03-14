
        $(document).ready(function() {
            // BUTTON ARRAY CODE **
            // var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            //     letters.forEach(function(letter) {
            //     var letterBtn = $('<button>')
            //         .data('letter', letter.toUpperCase())
            //         .text(letter);
            //         $('#buttons').append(letterBtn);
            //     });
            var wordChoice = ["balloon", "crabapple", "sandwiches", "ribbon", "bird", "information", "trapeze", "nosedive",];
            var ChosenWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];
            var answerArray = [];
            var wrongGuesses = [];
            for (var i=0; i<ChosenWord.length; i++) {
                answerArray[i] = "-";
            };
            // Recommendation from Byron that did NOT work    answerArray = Array(ChosenWord.length).fill("-");

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

                // for (var i=0; i<ChosenWord.length; i++) {
                //     answerArray[i] = "-";
                // };
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
            //JQuery ALT CODE ** $('button).bind('click keyup', function(event) {}//
            document.onkeyup = function(event) {
                if (alphabet.includes(event.key)) {
                    checkGuess();
                  } else {
                    alert('Please select a valid letter.');
                  }

            //BUTTON ARRAY CODE ** document.getElementsByTagName("button").onclick = function(event) {checkGuess()};

            function checkGuess() {

                var enterGuess = event.key;
                
                if(((enterGuess === "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o","p", "q", "r","s", "t", "u", "v", "w", "x", "y", "z")) && (!wrongGuesses.includes(enterGuess))) {
                    
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
                    var t = confirm("Congratulations! It was '" + ChosenWord + "!' You live to see another day.");
                    if (t == true) {newGame()};
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
        };})

