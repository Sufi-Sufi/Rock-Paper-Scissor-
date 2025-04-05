const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const historyList = document.getElementById("historyList");

let playerScore = 0;
let computerScore = 0;

// Sounds local 
const sounds = {
  click: new Audio("assets/sound/click.mp3"),
  win: new Audio("assets/sound/win.mp3"),
  lose: new Audio("assets/sound/lose.mp3"),
  tie: new Audio("assets/sound/tie.mp3")
};

// Online 
Object.keys(sounds).forEach(key => {
  sounds[key].onerror = () => {
    switch (key) {
      case "click":
        sounds[key] = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
        break;
      case "win":
        sounds[key] = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
        break;
      case "lose":
        sounds[key] = new Audio("https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg");
        break;
      case "tie":
        sounds[key] = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        break;
    }
  };
});

function playGame(playerChoice) {
  sounds.click.play();

  // Reset display
  playerDisplay.textContent = `Player: ${playerChoice}`;
  computerDisplay.textContent = `Computer: ...`;
  resultDisplay.textContent = "Waiting...";
  resultDisplay.classList.remove("greenText", "redText");

  let countdown = 3;
  timerDisplay.textContent = `Timer: ${countdown}`;

  const timer = setInterval(() => {
    countdown--;
    timerDisplay.textContent = `Timer: ${countdown}`;
    if (countdown === 0) {
      clearInterval(timer);
      timerDisplay.textContent = "";

      const computerChoice = choices[Math.floor(Math.random() * 3)];
      let result = "";

      if (playerChoice === computerChoice) {
        result = "It's a Tie!";
        sounds.tie.play();
      } else {
        switch (playerChoice) {
          case "rock":
            result = (computerChoice === "scissors") ? "You Win!" : "You Lose!";
            break;
          case "paper":
            result = (computerChoice === "rock") ? "You Win!" : "You Lose!";
            break;
          case "scissors":
            result = (computerChoice === "paper") ? "You Win!" : "You Lose!";
            break;
        }

        if (result === "You Win!") {
          sounds.win.play();
          playerScore++;
        } else {
          sounds.lose.play();
          computerScore++;
        }
      }

      computerDisplay.textContent = `Computer: ${computerChoice}`;
      resultDisplay.textContent = result;

      if (result === "You Win!") {
        resultDisplay.classList.add("greenText");
      } else if (result === "You Lose!") {
        resultDisplay.classList.add("redText");
      }

      playerScoreDisplay.textContent = playerScore;
      computerScoreDisplay.textContent = computerScore;

      // Add to history
      const listItem = document.createElement("li");
      listItem.textContent = `Player: ${playerChoice}, Computer: ${computerChoice} → ${result}`;
      historyList.prepend(listItem);
    }
  }, 1000);
}
