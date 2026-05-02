/* -------- Mobile Hamburger Menu -------- */
const hamburger = document.getElementById("hamburger"); // get the hamburger element by its ID and store it in a variable
const navList = document.getElementById("navList"); // get the navList element by its ID and store it in a variable
// Check if the hamburger element exists before adding event listeners
if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active"); // Toggle the "active" class on the hamburger element when it is clicked
    navList.classList.toggle("active"); // Toggle the "active" class on the nav list element when the hamburger is clicked
  });

  // Close menu when a nav link is clicked
  const navLinks = navList.querySelectorAll("a"); // Get all anchor elements within the nav list
  // Add click event listeners to each nav link to close the menu when clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active"); // Remove the "active" class from the hamburger element to close the menu
      navList.classList.remove("active"); // Remove the "active" class from the nav list element to close the menu
    });
  });

  // Close menu when clicking outside
  // Add a click event listener to the document to close the menu when clicking outside of it
  document.addEventListener("click", (event) => {
    // Check if the click target is not within the navbar container (which includes the hamburger and nav list)
    if (!event.target.closest(".navbar-cont")) {
      // remove the "active" class from both the hamburger and nav list to close the menu
      hamburger.classList.remove("active");
      navList.classList.remove("active");
    }
  });
}

const colorInput = document.querySelector(".input-js"); // Get the color input element and store it in a variable
// Add an event listener to the color input element to change the background color of the body when the input value changes
colorInput.addEventListener("input", (event) => {
  document.body.style.background = event.target.value;
});
// check if there is a saved background color in localStorage and apply it to the body and set the input value to the saved color
const inputValue = localStorage.getItem("backgroundColor");
if (inputValue) {
  document.body.style.background = inputValue;
  colorInput.value = inputValue;
}
// Add an event listener to the color input element to save the selected background color to local storage when it changes
colorInput.addEventListener("change", (event) => {
  localStorage.setItem("backgroundColor", event.target.value);
});

const clickAudio = new Audio("audio/newclick.mov"); // Create a new Audio object for the click sound effect
clickAudio.volume = 0.2; // Set the volume of the click audio to 0.2 (20% of the maximum volume)

// Get the audio element with the class "audio" and set its volume to 0.05 (5% of the maximum volume) to ensure that the background music is not too loud during gameplay
const audioElement = document.querySelector(".audio");
audioElement.volume = 0.05;

// When the difficulty buttons are clicked, play the click audio, add a fade-out class to the game container, and after a short delay using setTimeout, play the background music, clear the game container, remove the fade-out class, and build the game based on the selected difficulty level (easy, medium, or hard)
document.querySelector(".easy-js").addEventListener("click", () => {
  clickAudio.play();
  const gameContainer = document.querySelector(".game-container");
  gameContainer.classList.add("fade-out");
  setTimeout(() => {
    audioElement.play();
    gameContainer.innerHTML = "";
    gameContainer.classList.remove("fade-out");
    buildEasyGame();
  }, 500);
});

document.querySelector(".medium-js").addEventListener("click", () => {
  clickAudio.play();
  const gameContainer = document.querySelector(".game-container");
  gameContainer.classList.add("fade-out");
  setTimeout(() => {
    audioElement.play();
    gameContainer.innerHTML = "";
    gameContainer.classList.remove("fade-out");
    buildMediumGame();
  }, 500);
});

document.querySelector(".hard-js").addEventListener("click", () => {
  clickAudio.play();
  const gameContainer = document.querySelector(".game-container");
  gameContainer.classList.add("fade-out");
  setTimeout(() => {
    audioElement.play();
    gameContainer.innerHTML = "";
    gameContainer.classList.remove("fade-out");
    buildHardGame();
  }, 500);
});

let currentCorrectAnswers = []; // Initialize an empty array to store the correct answers for the current game session
// Define an array of image paths that will be used in the game.
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
  "images/balloon.png",
  "images/umbrella.png",
  "images/clock.png",
  "images/bell.png",
  "images/candle.png",
  "images/crown.png",
  "images/diamond.png",
  "images/dice.png",
  "images/gift.png",
  "images/magnet.png",
  "images/microphone.png",
  "images/telescope.png",
];
// I got stuck on this part so I watched a tutorial on youtube about how to shuffle an array and I learned how to implement the shuffle algorithm to randomize the order of the images in the array.
// the function takes an array as an argument and using a for loop it iterates through the array from the last element to the first, generating a random index and swapping the current element with the element at the random index, effectively shuffling the array in place.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// The getRandomImages function creates a copy of the images array, shuffles it using the shuffleArray function, and then returns a new array containing the first 'count' elements from the shuffled array, effectively providing a random selection of images for the game.
function getRandomImages(count) {
  const shuffled = [...images];
  shuffleArray(shuffled);
  return shuffled.slice(0, count);
}
// displaying the images with their label at this part was quite challenging for me because I had to figure out how to extract the correct answer from the image path and also how to display the images with a smooth entry animation and I got help from github copilot. I analysed the code generated by copilot and I understood the split method to extract the image name from the path and then capitalize it for display. I also added a staggered animation effect by using setTimeout to add an "animate-in" class to each image item with a delay based on its index, creating a visually appealing entry animation for the images.
function displayImages(count) {
  const selectedImages = getRandomImages(count);
  currentCorrectAnswers = selectedImages.map((src) =>
    src.split("/").pop().split(".")[0].toLowerCase(),
  );
  const gameContainer = document.querySelector(".game-container");
  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("images-container");
  gameContainer.appendChild(imagesContainer);
  selectedImages.forEach((src, index) => {
    const imageItem = document.createElement("div");
    imageItem.classList.add("image-item");
    const img = document.createElement("img");
    const imgName = src.split("/").pop().split(".")[0];
    const capitalizedImgName =
      imgName.charAt(0).toUpperCase() + imgName.slice(1);
    const label = document.createElement("p");
    label.textContent = capitalizedImgName;
    label.classList.add("image-label");
    img.src = src;
    img.alt = `Image ${index + 1}`;
    img.classList.add("game-image");
    imageItem.appendChild(img);
    imageItem.appendChild(label);
    imagesContainer.appendChild(imageItem);
    // Add smooth entry animation with stagger
    setTimeout(() => {
      imageItem.classList.add("animate-in");
    }, index * 200);
  });
}
// The timeOut function is responsible for displaying a timeout message and creating input fields for the user to enter the items they remember after the timer runs out. It takes a count parameter that determines how many input fields to create based on the difficulty level of the game. The function also creates the submit button to handle the submission of user answers and calls the displayResults function to display the results.
function timeOut(count) {
  const gameContainer = document.querySelector(".game-container");
  const timeoutMessage = document.createElement("p");
  timeoutMessage.textContent = "Time's up! Now, enter the items you remember.";
  timeoutMessage.classList.add("timeout-message");
  gameContainer.appendChild(timeoutMessage);
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  gameContainer.appendChild(inputContainer);
  // here i tried using forEach method but it was giving me an error and I looked at the console and realised it is not an array. forEach is an array method so i used for loop instead
  for (let i = 0; i < count; i++) {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.placeholder = `Item ${i + 1}`;
    inputElement.classList.add("game-input");
    // Added an event listener to each input field to allow submission by pressing the Enter key
    inputElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
      }
    });
    inputContainer.appendChild(inputElement);
  }

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.type = "submit";
  submitButton.classList.add("submit-button");
  inputContainer.appendChild(submitButton);

  displayResults(submitButton);
}
// The displayResults function is responsible for handling the submission of user answers, calculating the score based on the correct answers, and displaying the results to the user. It also provides feedback based on the user's performance and allows them to play again by reloading the page. It takes the submitButton as an argument and adds a click event listener to it to trigger the result calculation and display when the button is clicked.
function displayResults(submitButton) {
  submitButton.addEventListener("click", () => {
    clickAudio.play();
    const inputs = document.querySelectorAll(".game-input");
    const userInputs = Array.from(inputs)
      .filter((input) => input.value.trim() !== "" && isNaN(input.value.trim())) // Filter out empty inputs and number inputs
      .map((input) => input.value.trim().toLowerCase());
    const uniqueUserAnswers = new Set(userInputs); // Use a Set to store unique user answers and filter out duplicates
    let score = 0;
    uniqueUserAnswers.forEach((userAnswer) => {
      // Check if the user's answer is included in the currentCorrectAnswers array and increment the score if it is correct
      if (currentCorrectAnswers.includes(userAnswer)) {
        score++;
      }
    });
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = "";
    const resultMessage = document.createElement("p");
    resultMessage.textContent = `Score: ${score}/${currentCorrectAnswers.length}`;
    resultMessage.classList.add("result-message");
    gameContainer.appendChild(resultMessage);
    // Provide feedback based on the user's performance and play corresponding audio effects
    if (score >= currentCorrectAnswers.length / 2) {
      const applauseAudio = new Audio("audio/newapplause.mov");
      applauseAudio.play();
      applauseAudio.volume = 0.3;
      const wellDoneMessage = document.createElement("p");
      wellDoneMessage.textContent = "Well done! You have a great memory!";
      wellDoneMessage.classList.add("well-done-message");
      gameContainer.appendChild(wellDoneMessage);
    } else {
      const failAudio = new Audio("audio/fail.mp3");
      failAudio.play();
      failAudio.volume = 0.3;
      const tryAgainMessage = document.createElement("p");
      tryAgainMessage.textContent = "Try again, you can do better!";
      tryAgainMessage.classList.add("try-again-message");
      gameContainer.appendChild(tryAgainMessage);
    }

    const scoreMessage = document.createElement("p");
    scoreMessage.textContent = `You remembered ${score} out of ${currentCorrectAnswers.length} items!`;
    scoreMessage.classList.add("score-message");
    gameContainer.appendChild(scoreMessage);

    const bestScore = localStorage.getItem("bestScore") || 0;
    if (score > bestScore) {
      localStorage.setItem("bestScore", score);
    }
    const bestScoreMessage = document.createElement("p");
    bestScoreMessage.textContent = `Best Score: ${
      localStorage.getItem("bestScore") || 0
    }`;
    bestScoreMessage.classList.add("best-score-message");
    const titleElement = document.querySelector(".title-container");
    titleElement.appendChild(bestScoreMessage);

    displayCorrectAnswers();
    displayUserAnswers(uniqueUserAnswers);

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.classList.add("play-again-button");
    gameContainer.appendChild(playAgainButton);
    playAgainButton.addEventListener("click", () => {
      location.reload();
    });
  });
}
// The displayCorrectAnswers function creates a new div element to display the correct answers from the current game session. It iterates through the currentCorrectAnswers array, capitalizes each answer, and appends them to the correct answers container. Finally, it appends the correct answers container to the game container for display.
function displayCorrectAnswers() {
  const correctAnswers = document.createElement("div");
  correctAnswers.classList.add("correct-answers");
  const correctAnswersTitle = document.createElement("h2");
  correctAnswersTitle.textContent = "Correct Answers:";
  correctAnswersTitle.classList.add("correct-answers-title");
  correctAnswers.appendChild(correctAnswersTitle);
  currentCorrectAnswers.forEach((answer) => {
    const answerItem = document.createElement("p");
    const capitalizedAnswer = answer.charAt(0).toUpperCase() + answer.slice(1);
    answerItem.textContent = capitalizedAnswer;
    answerItem.classList.add("correct-answer-item");
    correctAnswers.appendChild(answerItem);
  });
  const gameContainer = document.querySelector(".game-container");
  gameContainer.appendChild(correctAnswers);
}
// The displayUserAnswers function creates a new div element to display the user's answers from the current game session. It filters out any empty answers, capitalizes each answer, and appends them to the user answers container. It also checks if each user answer is correct by comparing it to the currentCorrectAnswers array and applies different background colors for correct and incorrect answers. Finally, it appends the user answers container to the game container for display.
function displayUserAnswers(uniqueUserAnswers) {
  const userAnswersContainer = document.createElement("div");
  userAnswersContainer.classList.add("user-answers");
  const userAnswersTitle = document.createElement("h2");
  userAnswersTitle.textContent = "Your Answers:";
  userAnswersTitle.classList.add("user-answers-title");
  userAnswersContainer.appendChild(userAnswersTitle);
  uniqueUserAnswers.forEach((answer) => {
    const answerItem = document.createElement("p");
    const capitalizedAnswer = answer.charAt(0).toUpperCase() + answer.slice(1);
    answerItem.textContent = capitalizedAnswer;
    answerItem.classList.add("user-answer-item");
    userAnswersContainer.appendChild(answerItem);
    if (currentCorrectAnswers.includes(answer)) {
      answerItem.style.backgroundColor = "#3498db";
    } else {
      answerItem.style.backgroundColor = "#ff3b30";
    }
  });
  const gameContainer = document.querySelector(".game-container");
  gameContainer.appendChild(userAnswersContainer);
}
// The timer function creates a countdown timer that displays the time left for the user to memorize the items. It takes a count parameter that sets the initial time for the timer. The function updates the timer display every second and plays a warning sound when there are 5 seconds left. When the timer reaches zero, it stops the countdown and pauses the warning sound.
function timer(count) {
  const timerParagraph = document.createElement("p");
  timerParagraph.classList.add("timer");
  timerParagraph.textContent = "Time Left: " + count;
  const gameContainer = document.querySelector(".game-container");
  gameContainer.appendChild(timerParagraph);
  const timerElement = document.querySelector(".timer");
  let timeLeft = count;
  const timerAudio = new Audio("audio/timer.mp3");
  let audioStarted = false;
  const timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = "Time Left: " + timeLeft;
    if (timeLeft <= 5 && !audioStarted) {
      timerAudio.play();
      timerAudio.volume = 0.3;
      audioStarted = true;
      timerElement.style.animation = "infinite 1s pulse";
    } else if (timeLeft <= 0) {
      timerAudio.pause();
      clearInterval(timer);
    }
  }, 1000);
}
// The buildEasyGame, buildMediumGame, and buildHardGame functions are responsible for setting up the game based on the selected difficulty level. Each function updates the game container with a message indicating the difficulty level, starts the timer with a specific time limit, displays a certain number of images to memorize, and sets a timeout to clear the game container and trigger the timeOut function after the timer runs out.
function buildEasyGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <p>Easy Level: Memorize the following 6 items</p>
  `;
  timer(20);
  displayImages(6);
  setTimeout(() => {
    gameContainer.innerHTML = "";
    timeOut(6);
  }, 20000);
}

function buildMediumGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <p>Medium Level: Memorize the following 8 items</p>
  `;
  timer(15);
  displayImages(8);
  setTimeout(() => {
    gameContainer.innerHTML = "";
    timeOut(8);
  }, 15000);
}

function buildHardGame() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = `
    <p>Hard Level: Memorize the following 10 items</p>
  `;
  timer(10);
  displayImages(10);
  setTimeout(() => {
    gameContainer.innerHTML = "";
    timeOut(10);
  }, 10000);
}
