const symbols = ["🐶", "🐱", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🙈", "🙊", "🙉",
                   "🐔", "🐧", "🦅", "🐗", "🐊", "🐜", "🐟", "🐪", "🐈", "🐘", "🐉", "🦏", "🐦", "🐍", "🦈", "🦐"];
let tiles = [];
let selectedTile = null;
let score = 0;
let time = 60; // 60 seconds
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
  document.getElementById("message").textContent = "Game Over";
  // You can add more logic for game over here
}

function winGame() {
  gameStarted = false;
  document.getElementById("message").textContent = "You Win!";
  // You can add more logic for winning the game here
}

document.getElementById("start-game").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter your username to start the game.");
  } else {
    document.getElementById("current-user").textContent = `Current User: ${username}`;
    gameStarted = true;
    initializeGame();
    document.getElementById("header-center").style.display = "none";
    document.getElementById("game-board").style.display = "grid";
  }
});
