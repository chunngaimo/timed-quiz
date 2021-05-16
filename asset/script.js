//DEFINE VARIABLES
const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["a. <Hyper Text Markup Language>","b. <Hyperlinks and Text Markup Language>","c. <Home Tool Markup Language>","d. <Hi THE MEME LORD>"],
        answer: "a. <Hyper Text Markup Language>"
    },
    {
        question: "What does CSS stand for?",
        choices: ["a. <Cascading style sheet>", "b. <Creative Style Sheets>","c. <Computer Style Sheets>","d. <Colorful Style Sheets>"],
        answer: "a. <Cascading style sheet>"
    },
    {
        question: "Commonly use data types includes",
        choices: ["a. <Strings>","b. <Boolean>","c. <Integer>","d. <All of the above>"],
        answer: "d. <All of the above>"
    },
    {
        question: "Which is the correct CSS syntax?",
        choices: ["a. <body {color: black;}>", "b. <{body:color=black;}>","c. <body:color=black;>","d. <{body;color:black;}>"],
        answer: "a. <body {color: black;}>"
    }
];


//reference
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startQuiz = document.getElementById("begin");
var startBtn = document.getElementById("start-button");

var questionSection = document.getElementById("questionSection");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var results = document.getElementById("results");
var submitBtn = document.getElementById("submitBtn");
var initialInput = document.getElementById("initialInput");
var allContent = document.getElementById("allContent");

var highScore = document.getElementById("highScore");
var scoreOf = document.getElementById("scoreOf");

var goBack = document.getElementById("goBack");
var clearHighScore = document.getElementById("clearHighScore"); 
var viewScore = document.getElementById("viewScore");
var listOfScores = document.getElementById("listOfScores");

// define other variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var qIndex = 0;

//WHEN I click the start button,timer starts
var totalTime = 61;
function newQuiz() {
    qIndex = 0;
    totalTime = 60;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startQuiz.style.display = "none";
    questionSection.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (qIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

//questions and choices
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[qIndex].question;
    choiceA.textContent = questions[qIndex].choices[0];
    choiceB.textContent = questions[qIndex].choices[1];
    choiceC.textContent = questions[qIndex].choices[2];
    choiceD.textContent = questions[qIndex].choices[3];
}

//checkAnswer
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[qIndex].answer === questions[qIndex].choices[answer]) {
        //correct answer, add 1 to the score
        correctAns++;

        answerCheck.textContent = "Correct!";
    } else {
        //wrong answer, deduct 10 second from timer
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[qIndex].answer;
    }

    qIndex++;
    //repeat with the rest of questions 
    if (qIndex < questions.length) {
        nextQuestion();
    } else {
        //if no more question, run game over function
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

//game over
function gameOver() {
    results.style.display = "block";
    questionSection.style.display = "none";
    startQuiz.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";
    
      //show score
      scoreOf.textContent = correctAns;
    }

    //enter initial and store score in localStorage
function storeHighScores(event) {
    event.preventDefault();

    //stop function if initial is blank
    if (initialInput.value === "") {
        alert("Enter your initials!");
        return;
    } 

    startQuiz.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    results.style.display = "none";
    highScore.style.display = "block";   

    //store scores into localStorage
    var savedHighScores = localStorage.getItem("highscores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: scoreOf.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

     //stringify array in order to store in localStorage
     var scoresArrayString = JSON.stringify(scoresArray);
     window.localStorage.setItem("highscores", scoresArrayString);

     //show current score
    showHighScores();
}

//function to show high score
var i = 0;
function showHighScores() {

    startQuiz.style.display = "none";
    timer.style.display = "none";
    questionSection.style.display = "none";
    timesUp.style.display = "none";
    results.style.display = "none";
    highScore.style.display = "block";

    var savedHighScores = localStorage.getItem("highscores");

    //check if there is any in localStorage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfScores.appendChild(eachNewHighScore);
    }
}

//event listeners

startBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBack.addEventListener("click", function() {
    window.location.reload();
    startQuiz.style.display = "block";
    highScore.style.display = "none";
});

clearHighScore.addEventListener("click", function(){
    window.localStorage.removeItem("highscores");
    listOfScores.innerHTML = "High Scores Cleared!";
    listOfScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});