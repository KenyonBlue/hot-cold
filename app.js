var secretNumber = generateRandomNumber(1, 100);
//console.log("Secret Number: " + secretNumber);

//the closer your are to the random number the color changes to from neutral grey to hot red
document.body.style.backgroundColor = '#333';

//this variable will hold the historic value of the previous guess in order to display the relative Feedback ("Hotter or Colder") functionality
var oldGuess = 0;

//set the maximum number of guesses
var counter = 30;
$('#count').text(counter);

// Function to start a new game
function newGame() {
    //reload the page when you start a new game
    document.location.reload(true);
}

// Function to generate the random number
function generateRandomNumber(min, max) {
    //Returns a random integer between min (included) and max (included); Math.floor() will give you a non-uniform distribution!
    //random number generator details can be found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

// Function to count the number of guesses
function showGuessCounter(counter) {
    $('#count').text(counter);
}

// Function to show the history of guesses
function guessHistory(guessedNumber) {
    $('#guessList').append('<li>' + guessedNumber + '</li>');
}

// Function to implement a simple validation of the insert input
function validation(guessedNumber) {

    //check the guessed number in the console
    //console.log("Guessed Number: " + guessedNumber);


    /* start applying validation, from the less restrictive one to the most restrictive one; each rule NEGATES the truth*/

    //make sure that we get a number
    if (isNaN(guessedNumber)) {
        alert('You must enter a number!!');
        //reset the guessed number to nothing in order to start a new guessing cycle
        $('#userGuess').val('');
        return false; // this means, stop the loop and don't do anything else
    }

    //if the number is divisible by 1 it means it is an integer (it has no decimals)
    else if (guessedNumber % 1 !== 0) {
        alert('You must enter an integer value!!');
        //reset the guess value to nothing
        $('#userGuess').val('');
        return false; // this means, stop the loop and don't do anything else
    }

    //if the guessedNumber is smaller than 1 OR the guessedNumber is bigger than 100...
    else if ((guessedNumber < 1) || (guessedNumber > 100)) {
        alert('Please guess a number between 1 to 100!!');
        //reset the guess value to nothing
        $('#userGuess').val('');
        return false; // this means, stop the loop and don't do anything else
    }

    //else the guessedNumber is valid
    else {
        //call the function guessFeedback to guess the feedback
        guessFeedback(secretNumber, guessedNumber);
        //decrease the number of available guesses
        counter--;
        //update the guess history
        guessHistory(guessedNumber);
        //update the number of guesses
        showGuessCounter(counter);
        //reset the guess value to nothing
        $('#userGuess').val('');

        //if the number of guesses is smaller than 0 it means that the game is over
        if (counter <= 0) {
            //show the message Gme over
            $('#feedback').text('Game Over!');
            //disable the guess field so the user can't input anymore guesses
            document.getElementById("userGuess").disabled = true;
            //disable the guess button so the user can't guess anymore
            document.getElementById("guessButton").disabled = true;
            //show the sectret number before the user strats a new game
            alert('The Secret number was ' + secretNumber + ' ! Better luck next time !!');
        }
    }
}

// Function to provide feedback to the user
function guessFeedback(secretNumber, guessedNumber) {
    //show the absolute value of the difference between the secretNumber and guessedNumber
    //NOTE: the absolute value of a number as its distance from zero; no mather if it the absolute value is going to be positive or negative it will always be shown as positive value
    var difference = Math.abs(secretNumber - guessedNumber);
    //check the difference
    if (difference >= 50) {
        $('#feedback').text('Ice Cold!');
        //the closer your are to the random number the color changes to from neutral grey to hot red
        document.body.style.backgroundColor = '#002cb3';
    } else if (difference >= 30 && difference <= 49) {
        $('#feedback').text('Cold!');
        //the closer your are to the random number the color changes to from neutral grey to hot red
        document.body.style.backgroundColor = '#3333cc';
    } else if (difference >= 20 && difference <= 29) {
        $('#feedback').text('Warm!');
        //the closer your are to the random number the color changes to from neutral grey to hot red
        document.body.style.backgroundColor = '#8533ff';
    } else if (difference >= 10 && difference <= 19) {
        $('#feedback').text('Hot!');
        //the closer your are to the random number the color changes to from neutral grey to hot red
        document.body.style.backgroundColor = '#b84dff';
    } else if (difference >= 1 && difference <= 9) {
        $('#feedback').text('Very Hot!!');
        //the closer your are to the random number the color changes to from neutral grey to hot red
        document.body.style.backgroundColor = '#fc0446';
    } else {
        $('#feedback').text('You got it. Well done!');
        //the closer your are to the random number the color changes to from neutral grey to hot red
        document.body.style.backgroundColor = '#ff0404';
        //disable the guess field so the user can't input anymore guesses
        document.getElementById("userGuess").disabled = true;
        //disable the guess button so the user can't guess anymore
        document.getElementById("guessButton").disabled = true;
    }
}

// Function to provide relative feedback to the user
function relativeFeedback(secretNumber, oldGuess, newGuess) {
    //define the oldDiff as the difference between secretNumber and oldGuess
    var oldDiff = Math.abs(parseInt(secretNumber) - parseInt(oldGuess));
    //define the newDiff as the difference between secretNumber and newGuess
    var newDiff = Math.abs(parseInt(secretNumber) - parseInt(newGuess));
    //compare the oldDiff and newDiff
    if (newDiff > oldDiff) {
        $('#relative-feedback').text('You are colder than the last guess!');
    } else if (newDiff === oldDiff) {
        $('#relative-feedback').text('You are as far as your previous guess!');
    } else {
        $('#relative-feedback').text('You are hotter than the last guess!');
    }
}






/* Step 3
Using the Functions
*/
$(document).ready(function () {
    $('.new').on('click', newGame);

    $('#guessButton').on('click', function () {

        //first get the value that user added in the input box
        var guessedNumber = $('#userGuess').val();

        //store it in the newGuess variable as well to serve the relative Feedback ("Hotter or Colder") functionality
        var newGuess = guessedNumber;

        //validate all the numbers
        validation(guessedNumber);

        //only if the user added more than one guess (there is a guess history)
        if ((oldGuess !== 0) && (guessedNumber >= 1) && (guessedNumber <= 100)) {
            //call the relative feedback function defined above
            relativeFeedback(secretNumber, oldGuess, newGuess);
        }

        //re-update the old guess with the new value (so we will have a number in the history (oldGuess) to compare it with the new value)
        oldGuess = newGuess;
    });

    $(document).on('keypress', function (event) {
        //on enter
        if (event.which === 13) {

            //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
            event.preventDefault();

            //first get the value that user added in the input box
            var guessedNumber = $('#userGuess').val();

            //store it in the newGuess variable as well to activate the relative Feedback ("Hotter or Colder") functionality
            var newGuess = guessedNumber;

            //validate all the numbers
            validation(guessedNumber);

            //only if the user added more than one guess (there is a guess history)
            if ((oldGuess !== 0) && (guessedNumber >= 1) && (guessedNumber <= 100)) {
                //call the relative feedback function defined above
                relativeFeedback(secretNumber, oldGuess, newGuess);
            }

            //re-update the old guess with the new value (so we will have a number in the history (oldGuess) to compare it with the new value)
            oldGuess = newGuess;
        }
    });

    // Display information modal box
    $('.what').click(function () {
        $('.overlay').fadeIn(1000);
    });

    // Hide information modal box
    $('a.close').click(function () {
        $('.overlay').fadeOut(1000);
    });
});
