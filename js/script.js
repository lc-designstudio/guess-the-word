const guessedLetterElement = document.querySelector(".guessed-letters"); 
const guessLetterButton = document.querySelector(".guess"); 
const letterInput = document.querySelector(".letter"); 
const wordInProgress = document.querySelector(".word-in-progress"); 
const remaining = document.querySelector(".remaining"); 
const remainingSpan = document.querySelector(".remaining span"); 
const message = document.querySelector(".message"); 
const playAgainButton = document.querySelector(".play-again"); 
const word = "magnolia"; 
const guessedLetters = []; 

//display symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = []; 
  for (const letter of word) {
    console.log(letter); 
    placeholderLetters.push("●"); 
  } 
  wordInProgress.innerText = placeholderLetters.join(""); 
}; 

placeholder(word); 

guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = letterInput.value;
  message.innerText = ""; 
  const goodGuess = validatePlayerInput(guess); 
  
  if (goodGuess) {
    makeGuess(guess); 
  }
  letterInput.value = "";
}); 

const validatePlayerInput = function(input) {
  const acceptedLetter = /[a-zA-Z]/; 
  if (input.length === 0) {
    message.innerText = "You have eight guesses remaining."; 
} else if (input.length > 1) {
    message.innerText = "Please enter one letter at a time."; 
} else if (!input.match(acceptedLetter)) {
    message.innerText = "Please use a letter from A to Z."; 
  } else {
    return input; 
}
}; 

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guess this letter, try again!"; 
  }
  else {
    guessedLetters.push(guess);
    console.log(guessedLetters); 
  }
}; 
