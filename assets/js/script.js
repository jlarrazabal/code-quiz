//Global Variables
var timeRemaining = 60;
var currentQuestion = 0;
var highScore = 0;
var historicResults;
var finalScore = {};
var flag = true;
const questionTitle = document.getElementById("question");
const instructions = document.getElementById("quiz-instructions");
const questionsOptions = document.getElementById("options");
const startQuiz = document.getElementById("start-quiz-btn");
const viewHighScores = document.getElementById("high-Scores-link")
const questions = [{
    question: "______ is the most basic building block of the Web. It defines the meaning and structure of web content.",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "option1"
  },
  {
    question: "______ class represents one of JavaScript's data types. It is used to store various keyed collections and more complex entities.",
    options: ["The String", "The Object", "The Array", "The Boolean"],
    answer: "option2"
  },
  {
    question: "______ is a popular unopinionated web framework, written in JavaScript and hosted within the Node.js runtime environment.",
    options: ["Angular", "React.js", "Express", "jQuery"],
    answer: "option3"
  },
  {
    question: "______ the world’s most popular framework for building responsive, mobile-first sites, with jsDelivr and a template starter page.",
    options: ["jQuery", "Express", "Express", "Bootstrap"],
    answer: "option4"
  }
]

//Function to get the historic results from Local Storage
var init = function() {
  if (localStorage.getItem("scoresHistory") === null) {
    historicResults = [];
  } else {
    historicResults = JSON.parse(localStorage.getItem("scoresHistory"));
  }
}

//Function tha Manages the Timer at the top right corner of the page
var timer = function() {
  flag = false;
  let timerInterval = setInterval(function() {
    let timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = "Time Remaining: " + timeRemaining
    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      timerDisplay.innerText = "Game Over!";
      clearContent();
      if (document.getElementById("final-score") === null && document.getElementById("initials-form") === null && document.getElementById("initials-input") === null && document.getElementById("submit-button") === null) {
        addResultsForm();
      }
    }
    timeRemaining--;
  }, 1000);
  addQuestions();
}

//Function that adds the questions after starting the quiz and after a question is answered by the user
var addQuestions = function() {
  if (currentQuestion < questions.length) {
    for (var i = 0; i < 4; i++) {
      questionTitle.innerText = questions[currentQuestion].question;
      let newOption = document.createElement("button");
      newOption.innerText = questions[currentQuestion].options[i];
      newOption.setAttribute("id", "option" + (i + 1));
      newOption.setAttribute("class", "btn btn-info question-options");
      addEvent(newOption);
      questionsOptions.appendChild(newOption);
    }
  } else {
    timeRemaining = 0;
    addResultsForm();
  }
}

//Function that adds an event listener to the option buttons to capture the user selection
var addEvent = function(newEvent) {
  newEvent.addEventListener("click", validateAnswer, true);
}

//Function that removes the event listener from the option buttons to prevent multiple selections by the user
var removeEvent = function() {
  for (var i = 0; i < 4; i++) {
    document.getElementById("option" + (i + 1)).removeEventListener("click", validateAnswer, true);
  }
}

//Fuction that compares the option selected by the user and the correct answer of the question then returs a message to the user with the result. If the answer is correct, the function will add a point to the user's score. If the answer is Incorrect, the fuction will substract 5 seconds from the remaining time
var validateAnswer = function(event) {
  let userAnswerID = event.target.getAttribute("id");
  let questionAnswer = questions[currentQuestion].answer;
  removeEvent();
  if (userAnswerID === questionAnswer) {
    addNextQuestionButton();
    highScore++;
    currentQuestion++;
  } else {
    addNextQuestionButton();
    document.getElementById("validation-result").innerText = "Incorrect answer."
    timeRemaining = timeRemaining - 5;
    currentQuestion++;
  }
}
//Function that updates the question and options after the user clicks on the next button
var updateQuestion = function() {
  clearContent();
  addQuestions();
}
//Function that adds the result message based on the user's selection and the next button to move to then next question or to the results page to register the score
var addNextQuestionButton = function() {
  let validationResult = document.createElement("p");
  validationResult.innerText = "Correct answer!";
  validationResult.setAttribute("id", "validation-result");
  validationResult.setAttribute("class", "results");
  questionsOptions.appendChild(validationResult);
  let newQuestion = document.createElement("button");
  newQuestion.innerText = "Next";
  newQuestion.setAttribute("id", "next-question");
  newQuestion.setAttribute("class", "btn btn-info btn-warning next-question-btn");
  newQuestion.addEventListener("click", updateQuestion);
  questionsOptions.appendChild(newQuestion);
}

//Fuction that adds the results form for the user to register the score after answeing all the questions
var addResultsForm = function() {
  questionTitle.innerText = "Register your score";
  let finalScore = document.createElement("p");
  finalScore.innerText = "Your final score is: " + highScore;
  finalScore.setAttribute("id", "final-score");
  finalScore.setAttribute("class", "score");
  questionsOptions.appendChild(finalScore);
  let initialsForm = document.createElement("form");
  initialsForm.setAttribute("id", "initials-form");
  initialsForm.setAttribute("class", "form");
  questionsOptions.appendChild(initialsForm);
  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id", "initials-input");
  initialsInput.setAttribute("class", "form-item");
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("name", "initials");
  initialsInput.setAttribute("placeholder", "Please type your initials.");
  initialsForm.appendChild(initialsInput);
  let submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.setAttribute("id", "submit-button");
  submitButton.setAttribute("class", "btn btn-primary btn-lg");
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveResults(event);
  });
  initialsForm.appendChild(submitButton);
}

//Function that saves the results of the quiz and stores the data in the browswer's local Storage
var saveResults = function(initials) {
  console.log(initials);
  let newInitials = document.getElementById("initials-input").value;
  if(newInitials === "") {
    alert("Initials are required to proceed, please try again")
  } else {
    let newScore = highScore;
    let newRecord = {
      initials: newInitials,
      score: newScore
    }
    finalScore = newRecord;
    historicResults.push(newRecord);
    localStorage.setItem("scoresHistory", JSON.stringify(historicResults));
    console.log(finalScore);
    renderHighScores();
    flag = true;
  }
}

//Function that renders the High Scores
var renderHighScores = function() {
  clearContent();
  questionTitle.innerText = "High Scores";
  let initialsSubTitle = document.createElement("h3");
  initialsSubTitle.innerText = "Intials";
  initialsSubTitle.setAttribute("id", "initials-sub-title");
  initialsSubTitle.setAttribute("class", "sub-title");
  questionsOptions.appendChild(initialsSubTitle);
  let scoreSubTitle = document.createElement("h3");
  scoreSubTitle.innerText = "Scores";
  scoreSubTitle.setAttribute("id", "scores-sub-title");
  scoreSubTitle.setAttribute("class", "sub-title");
  questionsOptions.appendChild(scoreSubTitle);
  for (var i = 0; i < historicResults.length; i++) {
    let highScoreSection = document.createElement("div");
    highScoreSection.setAttribute("id", "high-scores-div" + i);
    highScoreSection.setAttribute("class", "high-scores");
    questionsOptions.appendChild(highScoreSection);
    let initials = document.createElement("h5");
    initials.innerText = historicResults[i].initials;
    initials.setAttribute("id", "initials" + i);
    initials.setAttribute("class", "high-score-list");
    highScoreSection.appendChild(initials);
    let score = document.createElement("h5");
    score.innerText = historicResults[i].score;
    score.setAttribute("id", "score" + i);
    score.setAttribute("class", "high-score-list");
    highScoreSection.appendChild(score);
  }
  let goBackButton = document.createElement("button");
  goBackButton.innerText = "Go Back";
  goBackButton.setAttribute("id", "go-back-button");
  goBackButton.setAttribute("class", "btn btn-primary btn-lg");
  goBackButton.addEventListener("click", function(event) {
    event.preventDefault();
    location.reload();
  });
  questionsOptions.appendChild(goBackButton);
  let clearButton = document.createElement("button");
  clearButton.innerText = "Clear Scores";
  clearButton.setAttribute("id", "clear-button");
  clearButton.setAttribute("class", "btn btn-danger btn-lg");
  clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    clearScores();
  });
  questionsOptions.appendChild(clearButton);
}

//Fuction that cleares the scores in the historicResults variable and the local storage
var clearScores = function() {
  clearContent();
  historicResults = [];
  localStorage.clear();
  renderHighScores();
}

//Function that clears the content of the page to allow the other functions to render the different views of the page
var clearContent = function() {
  if (instructions != null) {
    instructions.remove();
  }
  if (startQuiz != null) {
    startQuiz.remove();
  }
  if (startQuiz != null) {
    startQuiz.remove();
  }
  while (questionsOptions.firstChild) {
    questionsOptions.removeChild(questionsOptions.firstChild);
  }
}

//Adds the addEventListener for the Start Quiz button
startQuiz.addEventListener("click", function() {
  instructions.remove();
  startQuiz.remove();
  timer();
});

//Adds the addEventListener to the View High Score paragraph located the top left of the page
viewHighScores.addEventListener("click", function() {
  if(flag) {
    renderHighScores();
  }
});

//Runs the init function
init();
