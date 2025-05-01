const questions = [
  {
    question: "What does HTML stand for?",
    a: "Home Tool Markup Language",
    b: " Hyperlinks and Text Markup Language",
    c: "Hyper Text Markup Language",
    d: " Hyper Tool Markup Language",
    correct: "c",
  },
  {
    question: "What does CSS stand for?",
    a: "Central StyleSheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question:
      "The correct place to refer to an external style sheet in HTML file?",
    a: "In body tag",
    b: "In head tag",
    c: "In the end of document",
    d: "None",
    correct: "b",
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    a: "script tag",
    b: "style tag",
    c: "css",
    d: "None",
    correct: "b",
  },
  {
    question:
      "Which built-in method reverses the order of the elements of an array?",
    a: "changeOrder(order)",
    b: "reverse()",
    c: "sort(order)",
    d: "None of the above",
    correct: "b",
  },
];

const nextBtnElement = document.getElementById("next-btn");
const prevBtnElement = document.getElementById("prev-btn");
const submitBtnElement = document.getElementById("submit-btn");
const reloadBtnElement = document.getElementById("reload-btn");
const showBtnElement = document.getElementById("show-btn");
const hideBtnElement = document.getElementById("hide-btn");
const questionElement = document.getElementById("question");
const optionsElement = document.querySelectorAll(".option");
const optionsTextElement = document.querySelectorAll(".option-text");
const aTextElement = document.getElementById("a-text");
const bTextElement = document.getElementById("b-text");
const cTextElement = document.getElementById("c-text");
const dTextElement = document.getElementById("d-text");
const questionNoElement = document.getElementById("question-no");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const resultSummaryElement = document.getElementById("result-summary");
const showAnswersElement = document.getElementById("show-answers");
const liElements = document.querySelectorAll("li");

// 
let currQtnIdx = 0;
let userSelectedOptions = {};

// 
optionsElement.forEach((option) => {
  option.addEventListener("click", () => {
    optionsElement.forEach((option) => {
      option.closest("li").style.backgroundColor = "";
    });
    option.closest("li").style.backgroundColor = "#3435415e";
  });
});

// 
const loadQuestion = () => {
  questionNoElement.innerText = `${currQtnIdx + 1}/${questions.length}`;
  questionElement.innerText = questions[currQtnIdx].question;
  aTextElement.innerText = questions[currQtnIdx].a;
  bTextElement.innerText = questions[currQtnIdx].b;
  cTextElement.innerText = questions[currQtnIdx].c;
  dTextElement.innerText = questions[currQtnIdx].d;
  optionsElement.forEach((option) => {
    option.checked = false;
    option.closest("li").style.backgroundColor = "";
  });
  if (userSelectedOptions[currQtnIdx]) {
    document.getElementById(userSelectedOptions[currQtnIdx]).checked = true;
    document
      .getElementById(userSelectedOptions[currQtnIdx])
      .closest("li").style.backgroundColor = "#3435415e";
  }
  if (currQtnIdx === questions.length - 1) {
    submitBtnElement.classList.remove("hide");
    nextBtnElement.classList.add("hide");
  } else {
    submitBtnElement.classList.add("hide");
    nextBtnElement.classList.remove("hide");
  }
};

// 
const storeSelectedOption = () => {
  optionsElement.forEach((option) => {
    if (option.checked) {
      userSelectedOptions[currQtnIdx] = option.id;
    }
  });
};

// 
nextBtnElement.addEventListener("click", () => {
  storeSelectedOption();
  currQtnIdx++;
  if (currQtnIdx < questions.length) {
    loadQuestion();
  }
});

// 
prevBtnElement.addEventListener("click", () => {
  if (currQtnIdx > 0) {
    currQtnIdx--;
    loadQuestion();
  }
});

// 
submitBtnElement.addEventListener("click", () => {
  storeSelectedOption();
  let correctCount = 0;
  questions.forEach((question, id) => {
    if (question.correct === userSelectedOptions[id]) {
      correctCount++;
    }
  });
  quizElement.classList.add("hide");
  resultElement.classList.remove("hide");
  resultSummaryElement.innerHTML = 
  `<p>total no of questions: ${questions.length}</p>
    <p>answered: ${Object.values(userSelectedOptions).length}</p>
    <p>unanswered: ${questions.length - Object.values(userSelectedOptions).length}</p>
    <p>marks secured: ${correctCount}</p>`;
});

// 
showBtnElement.addEventListener("click", () => {
  showAnswersElement.classList.remove("hide");
  showBtnElement.classList.add("hide");
  hideBtnElement.classList.remove("hide");
  for (let i = 0; i < questions.length; i++) {
    const userAnswer = userSelectedOptions[i]
      ? `your answer: ${userSelectedOptions[i]}`
      : "status: not answered";
    function getBgColor(opt) {
      return questions[i].correct === opt
        ? "#0080009b"
        : userSelectedOptions[i] === opt
        ? "#ff0000a1"
        : "transparent";
    }
    showAnswersElement.insertAdjacentHTML(
      "beforeend",
      `<div>
        <p>${userAnswer}</p>
         <p>${i + 1}. ${questions[i].question}</p>
         <ol>
            <li style="background-color:${getBgColor("a")}">${
        questions[i].a
      }</li>
            <li style="background-color:${getBgColor("b")}">${
        questions[i].b
      }</li>
            <li style="background-color:${getBgColor("c")}">${
        questions[i].c
      }</li>
            <li style="background-color:${getBgColor("d")}">${
        questions[i].d
      }</li>
        </ol>
      </div>`
    );
  }
});

//
hideBtnElement.addEventListener("click", () => {
  showAnswersElement.classList.add("hide");
  hideBtnElement.classList.add("hide");
  showBtnElement.classList.remove("hide");
});

//
document.addEventListener("DOMContentLoaded", loadQuestion);
