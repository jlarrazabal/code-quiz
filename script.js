//Global Variables
var timeRemaining = 60;
var currentQuestion = 0;
var highScore = 0;
var historicResults = [];
const questionTitle = document.getElementById("question");
const instructions = document.getElementById("quiz-instructions");
const questionsOptions = document.getElementById("options");
const startQuiz = document.getElementById("start-quiz-btn");
const questions = [{
    question: "Question 1",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "option1"
  },
  {
    question: "Question 2",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "option2"
  },
  {
    question: "Question 3",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "option3"
  },
  {
    question: "Question 4",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "option4"
  }
]
var score = questions.length;

//Timer Function
var timer = function() {
  let timerInterval = setInterval(function() {
    let timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = "Time Remaining: " + timeRemaining
    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      timerDisplay.innerText = "Game Over!";
      removeQuestion();
      if(document.getElementById("final-score") === null && document.getElementById("initials-form") === null && document.getElementById("initials-input") === null && document.getElementById("submit-button") === null ) {
              addResultsForm();
      }
    }
    timeRemaining--;
  }, 1000);
  addQuestions();
}

//Add questions Function
var addQuestions = function() {
  if (currentQuestion < questions.length) {
    for (var i = 0; i < 4; i++) {
      questionTitle.innerText = questions[currentQuestion].question;
      let newOption = document.createElement("button");
      newOption.innerText = questions[i].options[i];
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

var addEvent = function(newEvent) {
  newEvent.addEventListener("click", validateAnswer, true);
}

var removeEvent = function() {
  for (var i = 0; i < 4; i++) {
    document.getElementById("option" + (i + 1)).removeEventListener("click", validateAnswer, true);
  }
}

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

var removeQuestion = function() {
  for (var i = 0; i < 4; i++) {
    if (document.getElementById("option" + (i + 1)) != null) {
      document.getElementById("option" + (i + 1)).remove();
    }
  }
  if (document.getElementById("validation-result") != null) {
    document.getElementById("validation-result").remove();
  }
  if (document.getElementById("next-question") != null) {
    document.getElementById("next-question").remove();
  }
}

var updateQuestion = function() {
  removeQuestion();
  addQuestions();
}

var addNextQuestionButton = function() {
  let validationResult = document.createElement("p");
  validationResult.innerText = "Correct answer!";
  validationResult.setAttribute("id", "validation-result");
  validationResult.setAttribute("class", "results");
  questionsOptions.appendChild(validationResult);
  let newQuestion = document.createElement("button");
  newQuestion.innerText = "Next Question";
  newQuestion.setAttribute("id", "next-question");
  newQuestion.setAttribute("class", "btn btn-info btn-warning next-question-btn");
  newQuestion.addEventListener("click", updateQuestion);
  questionsOptions.appendChild(newQuestion);
}

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
  submitButton.addEventListener("click", function(event){
    event.preventDefault();
    saveResults(event);
  });
  initialsForm.appendChild(submitButton);
}
//Complete This function!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var saveResults = function(initials) {
  console.log(initials);
  let newInitials = document.getElementById("initials-input").value;
  let newScore = highScore;
  let newRecord = {
    initials: newInitials,
    score: newScore
  }
  historicResults.push(newRecord);
  console.log(historicResults);
}

//Add function to see historicResults!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

startQuiz.addEventListener("click", function() {
  instructions.remove();
  startQuiz.remove();
  timer();
});
