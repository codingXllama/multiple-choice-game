const yesBtn = document.querySelector(".btn");
const bodyBgColor = document.querySelector(".neutral");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const cardContainer = document.getElementById("cardContainer");
let scoreValue = document.getElementById("value");
var value = 0;
var currentValue = 0;

// const nextBtn = document.getElementById("next-btn");
// const cardContainer = documnet.querySelector("#cardContainer");

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
  startBtn.classList.add("hide");
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

  // alert("A new question has been made");
}

function showQuestion(currentQuestion) {
  // resetGameState();
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    // checking the correctness of an answer
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      scoreValue.innerText;
    }
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
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  // checking if we have any more questions left
  if (shuffledQuestion.length > currentQuestionIndex + 1) {
    // showing the nextBtn
    nextBtn.classList.remove("hide");
  } else {
    startBtn.innerText = "Restart";
    startBtn.addEventListener("click", function() {
      // value = 0;
      currentValue = 0;
      scoreValue.innerText = 0;
    });
    startBtn.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  // scoreValue.innerHTML = 0;
  if (correct) {
    // currentValue += 1;
    element.classList.add("correct");
    // value++;
    scoreValue.innerText = Number(++currentValue);
    // clearStatusClass();
  } else {
    // currentValue -= 1;
    element.classList.add("incorrect");
    scoreValue.innerText = Number(--currentValue);
  }
  // value++;
}

// clearing the status of the answer
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

// Creating a lit of possible questions

const questions = [
  {
    question: "What is 2+2",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false }
    ]
  },
  {
    question: "who is better looking",
    answers: [
      { text: "Nuca", correct: true },
      { text: "Osa", correct: false }
    ]
  },
  {
    question: "what is nuca's favorite food",
    answers: [
      { text: "pizza", correct: false },
      { text: "chorBah", correct: true }
    ]
  },
  {
    question: "Who would win in soccer, iraq or bosnia",
    answers: [
      { text: "Iraq", correct: false },
      { text: "Bosnia", correct: false },
      { text: "No one cares", correct: true }
    ]
  },
  {
    question: "which animal is best for nuca",
    answers: [
      { text: "Cat", correct: false },
      { text: "Dog", correct: false },
      { text: "All the above", correct: true },
      { text: "All the above", correct: false }
    ]
  }
];
