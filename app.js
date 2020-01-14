const yesBtn = document.querySelector(".btn");
let bodyBgColor = document.querySelector(".neutral");
let startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const cardContainer = document.getElementById("cardContainer");
const scoreText = document.getElementById("score");
const myBody = document.getElementById("myBody");
let scoreValue = document.getElementById("value");
var currentValue = 0;

// Declaring the variables to select the required tags for the MODAL class - celebration screen
var winningModal = document.getElementById("winningModal");

//getting th ebutton that opens the modal
var modalBtn = document.getElementById("modalBtn");

// Getting the <span> element that closes the modal
var closeModal = document.getElementsByClassName("close")[0];

// triggering an event whent he user clicks on the modal btn, so we can open the modal
// modalBtn.onclick = function() {
//   winningModal.style.display = "block";
// };

const qsnContainerElement = document.getElementById("question-container");
let shuffledQuestion, currentQuestionIndex;
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
// Adding the required evenet listeners
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// 3 main functions

function startGame() {
  // alert("The game has started");
  // hiding the start btn
  myBody.classList.add("inGameBg");
  startBtn.classList.add("hide");
  // bodyBgColor.style.backgroundColor = "red";
  cardContainer.classList.remove("enable");
  shuffledQuestion = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  qsnContainerElement.classList.remove("hide");
  qsnContainerElement.classList.remove("container");
  setNextQuestion();

  // bodyBgColor.style.backgroundColor = "yellow";
}

function setNextQuestion() {
  resetGameState();
  showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(currentQuestion) {
  // resetGameState();
  questionElement.innerText = currentQuestion.question;
  // alert(questions.answers);
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    // checking the correctness of an answer
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      // scoreValue.innerText = Number();
    }
    // scoreValue.innerText = Number(--currentValue);
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetGameState() {
  // hiding the next Button
  // clearStatusClass(docoument.body);
  nextBtn.classList.add("hide");
  // scoreValue.innerText = currentValue;

  // as long as there is a childElement attached for a answer btn, then we will remove it, hence we will use 'firstChild'
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  // selecting our answer
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  // calling the updatMethod to check the status of the score , if it's 'true' then we will update the score, if not we will decrement the score
  updateScore(correct);
  // setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  // checking if we have any more questions left
  if (shuffledQuestion.length > currentQuestionIndex + 1) {
    // showing the nextBtn
    nextBtn.classList.remove("hide");
  } else {
    winningModal.style.display = "block";
    questionElement.classList.add("hide");
    scoreText.classList.add("hide");
    answerButtonsElement.classList.add("hide");
    startBtn.innerText = "Restart";
    scoreValue.classList.add("hide");

    // creating the functionality for the restart btn when it's clicked
    startBtn.addEventListener("click", function() {
      // hidinig the modal class
      winningModal.style.display = "none";
      questionElement.classList.remove("hide");
      answerButtonsElement.classList.remove("hide");
      scoreValue.classList.remove("hide");
      scoreText.classList.remove("hide");

      // resetting the score
      currentValue = 0;
      scoreValue.innerText = 0;
    });
    startBtn.classList.remove("hide");
  }
}

function updateScore(isCorrect) {
  if (isCorrect) {
    currentValue += 1;
  } else {
    currentValue -= 1;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  // updateScore(correct);
  // scoreValue.innerHTML = 0;
  if (correct) {
    // currentValue += 1;
    element.classList.add("correct");
    // scoreValue.innerText = Number(++currentValue);
  } else {
    element.classList.add("incorrect");
    // setScore("-1");
    // currentValue -= 1;
    // scoreValue.innerText = Number((currentValue -= 1));
    // scoreValue.innerText = Number(--currentValue);
  }
  scoreValue.innerText = Number(currentValue);
}

function setScore(status) {
  console.log("in socreSetter");
  if (status === "+1") {
    scoreValue.innerText = Number(++currentValue);
  } else {
    scoreValue.innerText = Number(--currentValue);
  }
}

// clearing the status of the answer
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

// Creating a lit of possible questions

const questions = [
  {
    question: "How many years have and Osa and Nuca been together?",
    answers: [
      { text: "4", correct: true },
      { text: "2", correct: false },
      { text: "idk and idc", correct: false }
    ]
  },
  {
    question: "Who is prettier, Osa or Nuca?",
    answers: [
      { text: "Osa", correct: false, score: 1 },
      { text: "Nuca", correct: true }
    ]
  },
  {
    question: "what is 2-2 ?",
    answers: [
      { text: "0", correct: true },
      { text: "22", correct: false }
    ]
  },
  {
    question: "what is 2*2 ?",
    answers: [
      { text: "4", correct: true },
      { text: "4.10", correct: false },
      { text: "No one cares", correct: false }
    ]
  },
  {
    question: "what is (2+2)/4",
    answers: [
      { text: "0", correct: false },
      { text: "2", correct: false },
      { text: "None of the above", correct: false },
      { text: "1", correct: true }
    ]
  }
];
