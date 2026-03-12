const colorInput = document.querySelector(".input-js");

colorInput.addEventListener("input", (event) => {
  document.body.style.background = event.target.value;
});

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

function timeOut(count) {
  const gameContainer = document.querySelector(".game-container");
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  gameContainer.appendChild(inputContainer);
  // here i tried using forEach but it was giving me an error and I realised it is not an array so i used for loop instead
  for (let i = 0; i < count; i++) {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.placeholder = `Item ${i + 1}`;
    inputElement.classList.add("game-input");
    inputContainer.appendChild(inputElement);
  }

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.type = "submit";
  submitButton.classList.add("submit-button");
  inputContainer.appendChild(submitButton);
}

function timer(count) {
  const timerParagraph = document.createElement("p");
  timerParagraph.classList.add("timer");
  timerParagraph.textContent = "Time Left: " + count;
  const gameContainer = document.querySelector(".game-container");
  gameContainer.appendChild(timerParagraph);
  const timerElement = document.querySelector(".timer");
  let timeLeft = count;
  const timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = "Time Left: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
    } else if (timeLeft <= 5) {
      timerElement.style.color = "#e74c3c"; // change color to red when time is less than or equal to 5 seconds
    }
  }, 1000);
}

function buildEasyGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <p>Easy Level: Memorize the following 8 items</p>
  `;
  timer(20);
  displayImages(8);
  setTimeout(() => {
    gameContainer.innerHTML = "";
    timeOut(8);
  }, 20000);
}

function buildMediumGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <p>Medium Level: Memorize the following 10 items</p>
  `;
  timer(15);
  displayImages(10);
  setTimeout(() => {
    gameContainer.innerHTML = "";
    timeOut(10);
  }, 15000);
}

function buildHardGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <p>Hard Level: Memorize the following 12 items</p>
  `;
  timer(10);
  displayImages(12);
  setTimeout(() => {
    gameContainer.innerHTML = "";
    timeOut(12);
  }, 1000);
}
