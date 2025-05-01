// reference to html elements
const countdownSetterElement = document.getElementById("countdown-setter");
const inputTextElement = document.getElementById("input-text");
const inputDateElement = document.getElementById("input-date");
const submitBtnElement = document.getElementById("submit-btn");
const countdownTimeElement = document.getElementById("countdown-time");
const countdownTimeTitleElement = document.getElementById(
  "countdown-time-title"
);
const timeElements = document.querySelectorAll("span");
const resetBtnElement = document.getElementById("reset-btn");
const countdownCompleteElement = document.getElementById("countdown-complete");
const newBtnElement = document.getElementById("new-btn");
const loaderElement = document.getElementById("loader");

// declaration and assignment of variables
let timeRef;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set the minimum input date for the countdown to today
const today = new Date().toISOString().split("T")[0];
inputDateElement.setAttribute("min", today);

// function to show the countdown time based on the input text and date
const showCountDownTime = ({ inputTextValue, inputDateValue }) => {
  timeRef = setInterval(() => {
    const now = new Date().getTime();
    const distance = inputDateValue - now;
    if (distance < 0) {
      clearInterval(timeRef);
      loaderElement.classList.add("hide");
      countdownTimeElement.classList.add("hide");
      countdownCompleteElement.classList.remove("hide");
    } else {
      loaderElement.classList.add("hide");
      countdownCompleteElement.classList.add("hide");
      countdownTimeElement.classList.remove("hide");
      countdownTimeTitleElement.innerText = inputTextValue;
      timeElements[0].innerText = Math.floor(distance / day);
      timeElements[1].innerText = Math.floor((distance % day) / hour);
      timeElements[2].innerText = Math.floor((distance % hour) / minute);
      timeElements[3].innerText = Math.floor((distance % minute) / second);
    }
  }, 1000);
};

// event listener for the submit button
submitBtnElement.addEventListener("click", () => {
  const inputTextValue = inputTextElement.value;
  const inputDateValue = new Date(inputDateElement.value).getTime();
  if (!inputTextValue.trim() || isNaN(inputDateValue)) {
    alert("Please enter a valid countdown name and select a valid future date.");
    return;
  }
  countdownSetterElement.classList.add("hide");
  loaderElement.classList.remove("hide");
  const countdownObj = {
    inputTextValue,
    inputDateValue,
  };
  localStorage.setItem("COUNTDOWN", JSON.stringify(countdownObj));
  showCountDownTime(countdownObj);
});

// function to reset the countdown
const resetCountdown = () => {
  countdownTimeElement.classList.add("hide");
  countdownCompleteElement.classList.add("hide");
  countdownSetterElement.classList.remove("hide");
  clearInterval(timeRef);
  inputTextElement.value = "";
  inputDateElement.value = "";
  countdownTimeTitleElement.innerText = "";
  timeElements.forEach((element) => (element.innerText = ""));
  localStorage.removeItem("COUNTDOWN");
};

// event listeners for reset button
resetBtnElement.addEventListener("click", resetCountdown);

// event listeners for new button
newBtnElement.addEventListener("click", resetCountdown);

// retrieve stored countdown data from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  try {
    const countdownObj = JSON.parse(localStorage.getItem("COUNTDOWN"));
    if (countdownObj) {
      countdownSetterElement.classList.add("hide");
      loaderElement.classList.remove("hide");
      showCountDownTime(countdownObj);
    }
  } catch (error) {
    console.error("Error parsing stored countdown data:", error);
    alert("Error loading countdown data. Please try again.");
  }
});
