const guessedLetterElement = document.querySelector(".guessed-letters"); 
const guessLetterButton = document.querySelector(".guess"); 
const letterInput = document.querySelector(".letter"); 
const wordInProgress = document.querySelector(".word-in-progress"); 
const remaining = document.querySelector(".remaining"); 
const remainingSpan = document.querySelector(".remaining span"); 
const message = document.querySelector(".message"); 
const playAgainButton = document.querySelector(".play-again"); 
let word = "magnolia"; 
let guessedLetters = []; 
let remainingGuesses = 8; 

const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");  
  const randomIndex = Math.floor(Math.random() * wordArray.length); 
  word = wordArray[randomIndex].trim(); 
  placeholder(word); 
}; 

getWord(); 

//display symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = []; 
  for (const letter of word) {
    //console.log(letter); 
    placeholderLetters.push("●"); 
  } 
  wordInProgress.innerText = placeholderLetters.join(""); 
}; 



guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value; 
  const goodGuess = validatePlayerInput(guess); 
  
  if (goodGuess) {
    makeGuess(guess); 
  }
  letterInput.value = "";
}); 

const validatePlayerInput = function (input) {
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
    countRemainingGuesses(guess); 
    updateGuessedLetters();
    updateWordInProgress(guessedLetters); 
  }
}; 

const updateGuessedLetters = function () {
  guessedLetterElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li"); 
    li.innerText = letter; 
    guessedLetterElement.append(li); 
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●"); 
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin(); 
}; 

const countRemainingGuesses = function (guess) {
  const upperWord = word.toUpperCase(); 
  if (!upperWord.includes(guess)) {
    message.innerText = `This word doesn't contain ${guess}`; 
    remainingGuesses -= 1; 
  } else {
    message.innerText = `This word contains ${guess}`; 
  }
  
  if (remainingGuesses === 0) {
    message.innerText = `You're out of guesses! The word was <span class="highlight">${word}</span>.`; 
    startOver(); 
  } else if (remainingGuesses === 1) {
    remainingSpan.innerText = `${remainingGuesses} guess`; 
  } else {
    remainingSpan.innerText = `${remainingGuesses} guesses`; 
  }
}; 

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class ="highlight">Yay! You guessed the correct word!</p>`; 

    startOver(); 
  }
}; 

const startOver = function () {
  guessLetterButton.classList.add("hide"); 
  remaining.classList.add("hide"); 
  guessedLetterElement.classList.add("hide"); 
  playAgainButton.classList.remove("hide"); 
}; 

playAgainButton.addEventListener("click", function () {
  //reset all original values - grab new word
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingSpan.innerText = `${remainingGuesses} guesses`;
  guessedLetterElement.innerHTML = "";
  message.innerText = "";
  //grab new word
  getWord();

  //show the right UI elements
  guessLetterButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remaining.classList.remove("hide");
  guessedLetterElement.classList.remove("hide");
}); 