//
const weaponElements = document.querySelectorAll(".weapon");
const movesLeftValueElement = document.getElementById("moves-left-value");
const gameElement = document.getElementById("game");
const gameResultElement = document.getElementById("game-result");
const userChoiceElement = document.getElementById("user-choice");
const computerChoiceElement = document.getElementById("computer-choice");
const computerScoreElement = document.getElementById("computer-score");
const userScoreElement = document.getElementById("user-score");
const resetBtnElement = document.getElementById("reset-game-btn");
const playAgainBtnElement = document.getElementById("play-again-btn");
const winnerElement = document.getElementById("winner");
const finalUserScoreElement = document.getElementById("final-user-score");
const finalComputerScoreElement = document.getElementById(
  "final-computer-score"
);
const overlayElement = document.getElementById("overlay");

//
let moves = 20;
let computerScore = 0;
let userScore = 0;

//
const playGame = (userChoice, computerChoice) => {
  userChoiceElement.classList.add("hide-line");
  computerChoiceElement.classList.add("hide-line");
  userChoiceElement.innerText = userChoice;
  computerChoiceElement.innerText = computerChoice;
  moves--;
  movesLeftValueElement.innerText = moves;
  if (userChoice !== computerChoice) {
    if (
      (userChoice === "rock" && computerChoice === "scissor") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissor" && computerChoice === "paper")
    ) {
      userScore++;
      userScoreElement.innerText = userScore;
    } else {
      computerScore++;
      computerScoreElement.innerText = computerScore;
    }
  }
  if (moves === 0) {
    overlayElement.classList.remove("hide");
    setTimeout(() => {
      overlayElement.classList.add("hide");
      gameElement.classList.add("hide");
      gameResultElement.classList.remove("hide");
      const winner =
        computerScore > userScore
          ? "computer"
          : computerScore === userScore
          ? "both"
          : "you";
      finalUserScoreElement.innerText = userScore;
      finalComputerScoreElement.innerText = computerScore;
      winnerElement.innerText = winner + " won";
    }, 2000);
  }
};

//
weaponElements.forEach((weapon) => {
  weapon.addEventListener("click", () => {
    const userChoice = weapon.classList[0];
    const weapons = ["rock", "paper", "scissor"];
    const computerChoice = weapons[Math.floor(Math.random() * 3)];
    playGame(userChoice, computerChoice);
  });
});

//
const resetGame = () => {
  moves = 20;
  computerScore = 0;
  userScore = 0;
  movesLeftValueElement.innerText = 20;
  userChoiceElement.classList.remove("hide-line");
  computerChoiceElement.classList.remove("hide-line");
  userChoiceElement.innerText = "";
  computerChoiceElement.innerText = "";
  computerScoreElement.innerText = 0;
  userScoreElement.innerText = 0;
  finalUserScoreElement.innerText = 0;
  finalComputerScoreElement.innerText = 0;
  winnerElement.innerText = "";
};

//
resetBtnElement.addEventListener("click", resetGame);

//
playAgainBtnElement.addEventListener("click", () => {
  resetGame();
  gameElement.classList.remove("hide");
  gameResultElement.classList.add("hide");
});
