//Global Variables
var timeRemaining = 60;
var currentQuestion = 0;
const questionTitle = document.getElementById("question");
const instructions = document.getElementById("quiz-instructions");
const questionsOptions = document.getElementById("options");
const startQuiz = document.getElementById("start-quiz-btn");
const questions = [
  {
    question: "Question 1",
    options: ["Option 1","Option 2","Option 3","Option 4"],
    answer: "Option 1"
  },
  {
    question: "Question 2",
    options: ["Option 1","Option 2","Option 3","Option 4"],
    answer: "Option 2"
  },
  {
    question: "Question 3",
    options: ["Option 1","Option 2","Option 3","Option 4"],
    answer: "Option 3"
  },
  {
    question: "Question 4",
    options: ["Option 1","Option 2","Option 3","Option 4"],
    answer: "Option 4"
  }
]
var score = questions.length;

//Timer Function
var timer = function() {
  let timerInterval = setInterval(function(){
    let timerDisplay = document.getElementById("timer");
    timerDisplay.innerText="Time Remaining: "+ timeRemaining
    if(timeRemaining===0){
      clearInterval(timerInterval);
      timerDisplay.innerText="Time is up, Game Over!";
    }
    timeRemaining--;
  },1000);
  addQuestions();
}

//Add questions Function
var addQuestions = function() {
    instructions.remove();
    startQuiz.remove();
    for (var i = 0; i < 4; i++) {
      questionTitle.innerText=questions[0].question;
      let newOption = document.createElement("button");
      newOption.innerText=questions[i].options[i];
      newOption.setAttribute("id","option"+(i+1));
      newOption.setAttribute("class","btn btn-info question-options");
      questionsOptions.appendChild(newOption);
    }
    console.log(questionsOptions);
    document.getElementById("option1").addEventListener("click",validateAnswer(document.getElementById("option1").innerText));
    document.getElementById("option2").addEventListener("click",validateAnswer(document.getElementById("option2").innerText));
    document.getElementById("option3").addEventListener("click",validateAnswer(document.getElementById("option3").innerText));
    document.getElementById("option4").addEventListener("click",validateAnswer(document.getElementById("option4").innerText));
    //add code to move next question
}

var validateAnswer = function(userAnswer){
  console.log(userAnswer);
  // console.log(correctAnswer);
}

startQuiz.addEventListener("click",timer);
