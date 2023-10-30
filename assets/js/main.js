const playBtn = document.querySelector('#play')
const playScreen = document.querySelector('.play-screen')
const buttons = document.querySelectorAll('.option')
const startGameBtn = document.querySelector('#start')
const charactersScreen = document.querySelector('.characters')
const menuScreen = document.querySelector('.menu')
const mainScript = document.querySelector('#main-script')
let optionActive = 0

//Sounds
let soundtrack = new Audio("./assets/sounds/soundtracks/Main-Theme.mp3");
let optionSound = new Audio("./assets/sounds/Option.mp3");
let playSound = new Audio("./assets/sounds/Play.mp3");

playBtn.addEventListener("click", function () {
  playSound.play();
  playScreen.style.display = "none";
  menuScreen.style.display = "flex";
  soundtrack.play();
});


document.addEventListener('keydown', function (e) {
  buttons[optionActive].focus()

  if (e.key == "ArrowDown" || e.key == "s") {
    if (optionActive < buttons.length - 1) {
      optionActive++
      buttons[optionActive].focus()
      optionSound.play();
    }
  } else if (e.key == "ArrowUp" || e.key == "w") {
    if (optionActive > 0) {
      optionActive--
      buttons[optionActive].focus()
      optionSound.play();
    }
    else if (e.key == " ") {
      buttons[optionActive].click()
    }
  }
})

//Options Sound Effect
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mouseover", function () {
    optionSound.play();
  });
}

//Start Game Button Sound
startGameBtn.addEventListener("click", function () {
  playSound.play();
  menuScreen.style.display = "none";
  charactersScreen.style.display = "flex";
  document.body.removeChild(mainScript);
  let charactersScript = document.createElement("script")
  charactersScript.src = "assets/js/characters.js";
  charactersScript.id = "characters-script"
  document.body.appendChild(charactersScript);
});