// reference to html elements
const calculateBtnElement = document.getElementById("calculate-btn");
const resetBtnElement = document.getElementById("reset-btn");
const resultElement = document.getElementById("result");
const dobElement = document.getElementById("dob");
const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");

// array representing the number of days in each month (non-leap year)
const noOfDaysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// function to update no of days in february if the current is leap year
const updateNoOfDaysInFeb = (year) => {
  noOfDaysInAMonth[1] =
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
};

// function to calculate age
const calculateAge = () => {
  {
    // get the current date
    const current = new Date();
    const currentDay = current.getDate();
    const currentMonth = current.getMonth() + 1;
    const currentYear = current.getFullYear();

    // get the date of birth from the input field
    const dobValue = new Date(dobElement.value);

    // check if the entered date is valid
    if (isNaN(dobValue)) {
      alert("Please enter a valid date of birth.");
      return;
    }

    // extract day, month, and year from entered date of birth
    const birthDay = dobValue.getDate();
    const birthMonth = dobValue.getMonth() + 1;
    const birthYear = dobValue.getFullYear();

    // update no of days in february if the current is leap year
    updateNoOfDaysInFeb(currentYear);

    // initialize variables for age calculation
    let years, months, days;

    // check if the birthdate is in the future
    if (
      birthYear > currentYear ||
      (birthYear === currentYear && birthMonth > currentMonth) ||
      (birthYear === currentYear &&
        birthMonth === currentMonth &&
        birthDay > currentDay)
    ) {
      alert(
        "The birthdate cannot be in the future. Please check and enter a valid date of birth."
      );
      return;
    }

    // calculate years
    years = currentYear - birthYear;

    // calculate months
    if (currentMonth >= birthMonth) {
      months = currentMonth - birthMonth;
    } else {
      years--;
      months = 12 + currentMonth - birthMonth;
    }

    // calculate days
    if (currentDay >= birthDay) {
      days = currentDay - birthDay;
    } else {
      months--;
      days = noOfDaysInAMonth[currentMonth - 2] + currentDay - birthDay;
      if (months < 0) {
        months = 11;
        years--;
      }
    }

    // display the result
    resultElement.classList.remove("hide");
    yearsElement.innerText = years;
    monthsElement.innerText = months;
    daysElement.innerText = days;
  }
};

// event listener for calculate button
calculateBtnElement.addEventListener("click", calculateAge);

// event listener for the reset button
resetBtnElement.addEventListener("click", () => {
  // clear the input field and result
  dobElement.value = "";
  yearsElement.innerText = "";
  monthsElement.innerText = "";
  daysElement.innerText = "";
  // hide the result element
  resultElement.classList.add("hide");
});
