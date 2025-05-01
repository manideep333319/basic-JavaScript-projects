// reference to html elements
const resultElement = document.getElementById("result");
const clipboardBtnElement = document.getElementById("clipboard-btn");
const lengthElement = document.getElementById("length");
const upperCaseLettersElement = document.getElementById("uppercase-letters");
const lowerCaseLettersElement = document.getElementById("lowercase-letters");
const numbersElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generatePwdBtnElement = document.getElementById("generate-pwd-btn");

// function to return random lowercase letter
const getRandomLowerCaseLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

// function to return random uppercase letter
const getRandomUpperCaseLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// function to return random number
const getRandomNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

// function to return random symbol
const getRandomSymbol = () => {
  const symbols = "-=~!@#$%^&*()_+[]{}|:',.<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// event listener to generate password
generatePwdBtnElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const lower = lowerCaseLettersElement.checked;
  const upper = upperCaseLettersElement.checked;
  const number = numbersElement.checked;
  const symbol = symbolsElement.checked;
  if (!(lower || upper || number || symbol)) {
    alert("Select at least one option");
    return;
  }
  let generatedPassword = "";
  while (generatedPassword.length < length) {
    if (lower) {
      generatedPassword = generatedPassword + getRandomLowerCaseLetter();
    }
    if (upper) {
      generatedPassword = generatedPassword + getRandomUpperCaseLetter();
    }
    if (number) {
      generatedPassword = generatedPassword + getRandomNumber();
    }
    if (symbol) {
      generatedPassword = generatedPassword + getRandomSymbol();
    }
  }
  resultElement.value = generatedPassword.slice(0, length);
});

// event listener to copy generated password to clipboard
clipboardBtnElement.addEventListener("click", () => {
  const password = resultElement.value;
  if (!password) {
    alert("nothing to copy");
    return;
  }
  navigator.clipboard.writeText(password);
  clipboardBtnElement.classList.add("show-check");
  setTimeout(() => {
    clipboardBtnElement.classList.remove("show-check");
  }, 1500);
});
