const form = document.getElementById("game_form");
const glyph = document.getElementById("correct_glyph")
const answerList = document.getElementById("answer-list")
const correctGuessesSpan = document.getElementById("correct-guesses")
const nrOfGuessesSpan = document.getElementById("max-guesse")
let dictionary
let fiveLatest = []
let currentGuesses = 0;
let correctGuesses = 0;


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
        // updateList(correct, userGuess.value)
    } else {
        console.log("wrong: " + correct);
        currentGuesses++;
        updateList(correct, userGuess.value)
    }
    userGuess.value = ""
    nrOfGuessesSpan.textContent = currentGuesses
  pickRandomWord()
});

function updateList(answer, userGuess) {
    if (fiveLatest.length < 5) {
        fiveLatest.push([answer, userGuess])
    } else {
        fiveLatest.shift()
        fiveLatest.push([answer, userGuess])
    }

    answerList.innerHTML = ""

    for (let elm of fiveLatest.reverse()) {
        answerList.appendChild(makeLi(elm[0], elm[1]))
    }
    fiveLatest.reverse()
}

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
        p.textContent = " ❌ "+ answer + " you answered " + userGuess
    }
    li.appendChild(p)
    return li
}
