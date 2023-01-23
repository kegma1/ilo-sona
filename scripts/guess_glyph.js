const form = document.getElementById("game_form");
const glyph = document.getElementById("correct_glyph")
const answerList = document.getElementById("answer-list")
const correctGuessesSpan = document.getElementById("correct-guesses")
let dictionary

const maxGuesses = 15;
let currentGuesses = 0;
let correctGuesses = 0;

document.getElementById("max-guesse").textContent = maxGuesses
correctGuessesSpan.textContent = correctGuesses

fetch("../dictionary.json")
    .then(res => res.json())
    .then(data => {
        dictionary = [...data]
        pickRandomWord()
    })
    .catch(error => {
        console.error('Error:', error);
    });

function pickRandomWord() {
    if(dictionary == undefined) {
        return
    }
    const randomIndex =  Math.floor(Math.random() * dictionary.length)
    glyph.textContent = dictionary[randomIndex].word
}



form.addEventListener("submit", function(_) {
  event.preventDefault();
    const correct = glyph.textContent
    const userGuess = document.getElementById("textfield")
    if (userGuess.value == correct) {
        console.log("correct");
        currentGuesses++;
        correctGuesses++;
        correctGuessesSpan.textContent = correctGuesses
        answerList.appendChild(makeLi(correct, userGuess.value))

    } else {
        console.log("wrong: " + correct);
        currentGuesses++;
        answerList.appendChild(makeLi(correct, userGuess.value))
    }
    userGuess.value = ""
    if( currentGuesses == maxGuesses){
        document.getElementById("submit-button").disabled = true
    }
  pickRandomWord()
});

function makeLi(answer, userGuess) {
    const li = document.createElement("li")
    const spanCorrect = document.createElement("span")
    spanCorrect.classList.add("linja-pona")
    spanCorrect.textContent = answer
    li.appendChild(spanCorrect)
    const p = document.createElement("p")

    if(answer == userGuess) {
        p.textContent = " ✅ " + answer
    } else {
        p.textContent = " ❌ "+ answer
    }
    li.appendChild(p)
    return li
}