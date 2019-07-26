// Any global variables can be defined up here
let wordBank = [];
let words = [];
let difficulty = 9;
let wordCooldown = 0;
let gameTimer = 0;
let userString = "";
let score = 0;
//loadJSON('https://random-word-api.herokuapp.com/all?key=6SMW4K2K', onWordsAquired);

let url = "https://raw.githubusercontent.com/RazorSh4rk/random-word-api/master/words.json";

function preload() {

    // create empty arrays inside word array
    for (let i = 0; i < 20; i++) {
        wordBank.push([]);
    }

    // download data
    loadJSON(url, onWordsAquired);
}

function onWordsAquired(wordData) {
    for (let i = 0; i < wordData.length; i++) {
        wordBank[wordData[i].length].push(wordData[i]);
    }
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}


function draw() {
    // Update
    gameTimer++;
    wordCooldown--;
    if (wordCooldown <= 0) {
        let wordLength = round(random(3, difficulty));
        let pickedWord = wordBank[wordLength][round(random(0, wordBank[wordLength].length - 1))];
        words.push(new Word(random(0, width), -50, pickedWord));
        wordCooldown = 60 * 2;
    }

    // increase difficulty based on game timer
    if (gameTimer % (60 * 10) == 0) {
        difficulty = constrain(difficulty + 1, 3, 12);
    }

    // update word positions
    for (let i = 0; i < words.length; i++) {
        words[i].update();
        // check if user missed the word
        if (words[i].wordFailed) {
            gameOverScreen(words[i].word);
            noLoop();
            return;
        }
    }

    evaluateUserInput();
    // Render

    // draw the words
    background(0);
    for (let i = 0; i < words.length; i++) {
        words[i].render();
    }

    // print the score
    fill(200, 200, 200);
    textAlign(LEFT);
    textSize(40);
    text("SCORE: " + score, 20, 50);

    // print the user's typed word so far
    fill(150, 255, 150);
    textAlign(CENTER);
    textSize(40);
    text("You are typing: " + userString, width / 2, height - 80);

}


function evaluateUserInput() {
    if (lastKeyCode >= keyA && lastKeyCode <= keyZ) {
        userString += String.fromCharCode(lastKeyCode);
    } else if (lastKeyCode == BACKSPACE) {
        userString = userString.slice(0, userString.length - 1);
    } else if (lastKeyCode == ENTER) {
        // check every word and see if one is matched by the current user string
        for (let i = 0; i < words.length; i++) {
            if (words[i].matches(userString)) {
                score += words[i].word.length * 5;
                words.splice(i, 1);
                break;
            }
        }
        userString = "";
    }
    lastKeyCode = null;
}


function gameOverScreen(word) {
    background(0);
    fill(255, 255, 150);
    textAlign(CENTER);
    textSize(40);
    text("You missed the word: " + word + "\nScore: " + score + "\n\nClick to play again", width / 2, height / 2);
}


function mouseClicked() {
    words = [];
    difficulty = 3;
    wordCooldown = 0;
    gameTimer = 0;
    userString = "";
    score = 0;
    loop();
}
