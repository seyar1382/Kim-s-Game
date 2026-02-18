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

const images = [
  "images/apple.png",
  "images/key.png",
  "images/phone.png",
  "images/glasses.png",
  "images/watch.png",
  "images/pen.png",
  "images/pencil.png",
  "images/book.png",
  "images/coin.png",
  "images/cup.png",
  "images/spoon.png",
  "images/scissors.png",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomImages(count) {
  const shuffled = [...images];
  shuffleArray(shuffled);
  return shuffled.slice(0, count);
}

function displayImages(count) {
  const selectedImages = getRandomImages(count);
  const gameContainer = document.querySelector(".game-container");
  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("images-container");
  gameContainer.appendChild(imagesContainer);
  selectedImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Image ${index + 1}`;
    img.classList.add("game-image");
    imagesContainer.appendChild(img);
  });
}

function buildEasyGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <p>Easy Level: Memorize the following 8 items</p>
  `;
  shuffleArray(images);
  const randomImages = getRandomImages(8);
  displayImages(8);
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
