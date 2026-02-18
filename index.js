document.querySelector(".easy-js").addEventListener("click", () => {
  document.querySelector(".game-container").innerHTML = "";
  buildEasyGame();
});

document.querySelector(".medium-js").addEventListener("click", () => {
  document.querySelector(".game-container").innerHTML = "";
  buildMediumGame();
});

document.querySelector(".hard-js").addEventListener("click", () => {
  document.querySelector(".game-container").innerHTML = "";
  buildHardGame();
});

function buildEasyGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <h2>Easy Level</h2>
    <p></p>
  `;
}

function buildMediumGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <h2>Medium Level</h2>
    <p></p>
  `;
}

function buildHardGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <h2>Hard Level</h2>
    <p></p>
  `;
}
