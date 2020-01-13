const yesBtn = document.querySelector(".btn");
const bodyBgColor = document.querySelector(".neutral");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const cardContainer = document.getElementById("cardContainer");

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
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetGameState() {
  // hiding the next Button
  // clearStatusClass(docoument.body);
  nextBtn.classList.add("hide");

  // as long as there is a childElement attached for a answer btn, then we will remove it, hence we will use 'firstChild'
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// function showQuestion(someQuestion) {
//   questionTitle.innerText = someQuestion.question;
//   questionTitle.style.color = "#33333";
//   questionTitle.style.transform = "uppercase";

//   // generating possible answers
//   someQuestion.answers.forEach(answerButton => {
//     console.log("1");
//     const button = document.createElement("button");
//     console.log("2");

//     button.innerText = answerButton.text;
//     console.log("3");

//     button.classList.add("btn");
//     console.log("4");

//     if (answerButton.correct) {
//       button.dataset.correct = answerButton.correct;
//     }
//     button.addEventListener("click", selectAnswer);
//     // adding the posssible answers for the given question
//     answerButton.appendChild(button);
//   });
// }

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
    startBtn.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    // clearStatusClass();
  } else {
    element.classList.add("incorrect");
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
      { text: "Cat", correct: true },
      { text: "Dog", correct: true }
    ]
  }
];
