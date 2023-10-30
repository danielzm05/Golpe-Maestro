const stagesList = document.querySelector('.stages-menu')
let stageIconSound = new Audio("./assets/sounds/Icon.mp3");
let stageActive = 0

stages.forEach(stage => {
  let stageIcon = document.createElement("div");
  stageIcon.style.background = "url('" + stage.icon + "') no-repeat center center/cover";
  stageIcon.className = "stage-icon";
  stagesList.append(stageIcon);
});

let stageIcon = document.querySelectorAll('.stage-icon');

// Añadir la clase selected al primer elemento por defecto
stageIcon[0].classList.add("stage-icon-selected");
stageIcon[0].innerText = stages[0].name

document.addEventListener("keydown", function (e) {
  stageIcon[stageActive].classList.remove("stage-icon-selected");
  stageIcon[stageActive].innerText = "";

  if (e.key == "ArrowLeft" || e.key.toUpperCase() == "A") {
    stageActive = (stageActive == 0) ? stageIcon.length - 1 : stageActive -= 1;
    selected(stageIcon[stageActive]);

  } else if (e.key == "ArrowRight" || e.key.toUpperCase() == "D") {
    stageActive = (stageActive == stageIcon.length - 1) ? 0 : stageActive += 1;
    selected(stageIcon[stageActive]);

  } else if (e.key == "ArrowDown" || e.key.toUpperCase() == "S") {
    stageActive = (stageActive < stageIcon.length - 3) ? stageActive += 3 : stageActive
    selected(stageIcon[stageActive]);

  } else if (e.key == "ArrowUp" || e.key.toUpperCase() == "W") {
    stageActive = (stageActive > 2) ? stageActive -= 3 : stageActive;
    selected(stageIcon[stageActive]);

  } else if (e.key == " ") {
    stageIcon[stageActive].click()
    selection.stage = stages[stageActive]
    sessionStorage.setItem("selection", JSON.stringify(selection));
    window.location.href = "./fight.html";
    e.preventDefault();
  }

});

function selected(stageIcon) {
  stageIconSound.play();
  stageIcon.innerText = stages[stageActive].name
  stageIcon.classList.add("stage-icon-selected");
}
