const symbols = ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐴","🦓","🦈","🐲","🐬","🍀",
                "☘️","🍄","🌹","🌺","🍎","🍌","🍇","🍆","🥑","🥒","🍓","🍉","🍑","🥕","🌽","🥝","🍋","🍒","🍊","🍐",];
let tiles = [];
let selectedTile = null;
let score = 0;
let time = 150; 
let gameStarted = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function createTile(symbol) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.innerHTML = symbol;
  tile.addEventListener("click", () => {
      if (gameStarted) {
          selectTile(tile);
      }
  });
  return tile;
}

function updateTimer() {
  if (time === 0) {
      endGame();
  } else {
      time--;
      document.getElementById("time").textContent = time;
      if (gameStarted) {
          setTimeout(updateTimer, 1000);
      }
  }
}

function initializeGame() {
  shuffle(symbols);
  symbols.forEach((symbol) => {
      for (let i = 0; i < 2; i++) {
          const tile = createTile(symbol);
          tiles.push(tile);
      }
  });
  shuffle(tiles);
  tiles.forEach((tile) => {
      document.getElementById("game-board").appendChild(tile);
  });
  updateTimer();
}

function selectTile(tile) {
  if (tile === selectedTile) {
      return;
  }
  tile.classList.add("selected");
  if (selectedTile) {
      if (selectedTile.innerHTML === tile.innerHTML) {
          tile.style.visibility = "hidden";
          selectedTile.style.visibility = "hidden";
          score += 10;
          document.getElementById("score").textContent = score;
          if (score === symbols.length * 10) {
              winGame();
          }
      } else {
          document.getElementById("message").textContent = "Try again!";
          setTimeout(() => {
              document.getElementById("message").textContent = "";
              selectedTile.classList.remove("selected");
              tile.classList.remove("selected");
          }, 1000);
      }
      selectedTile = null;
  } else {
      selectedTile = tile;
  }
}

function endGame() {
  gameStarted = false;
  document.getElementById("message").textContent = "Time's Up";
  // Calculate the final score
  let finalScore = score;
  if (score > 0) {
    finalScore -= time; // Deduct time remaining if the player didn't finish
  } else {
    finalScore += time; // Add time remaining if the player finished
  }
  document.getElementById("score").textContent = finalScore;
  // Display a pop-up alert with the result
  alert("Time's Up");
}

function winGame() {
  gameStarted = false;
  document.getElementById("message").textContent = "You Finished the Game";
  // Calculate the final score
  let finalScore = score + time; // Add time remaining for the win
  document.getElementById("score").textContent = finalScore;
  // Display a pop-up alert with the result
  alert("You Finished the Game");
}

document.getElementById("login").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
      alert("Please enter your username to start the game.");
  } else {
      document.getElementById("current-user").textContent = `Current User: ${username}`;
      gameStarted = true;
      initializeGame();
      document.getElementById("login-form").style.display = "none";
      document.getElementById("game-board").style.display = "grid";
  }
});
