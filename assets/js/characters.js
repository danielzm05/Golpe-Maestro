const charactersList = document.querySelector('.characters-list')
const P1Presentation = document.querySelector('.player-1')
const P2Presentation = document.querySelector('.player-2')
const stagesScreen = document.querySelector('.stages')
const charactersScript = document.querySelector('#characters-script')
let iconSound = new Audio("./assets/sounds/Icon.mp3");
let P1Selected
let active = 0

//Creacion de los Iconos
characters.forEach(character => {
  let characterIcon = document.createElement("div");
  characterIcon.style.background = "url('" + character.icon + "') no-repeat center center/cover";
  characterIcon.className = "character-icon";
  let iconTitle = document.createElement("h3");
  iconTitle.className = "icon-title"
  characterIcon.append(iconTitle);
  charactersList.append(characterIcon);
});

let P1Title = document.createElement("h2")
let P1Skin = document.createElement("img")
let P1characteristics = document.createElement("p")
P1Skin.className = "fadeInLeft"
P1Presentation.append(P1Title)
P1Presentation.append(P1Skin)
P1Presentation.append(P1characteristics)

let P2Title = document.createElement("h2")
let P2Skin = document.createElement("img")
let P2characteristics = document.createElement("p")
P2Skin.className = "fadeInRight"
P2Presentation.append(P2Title)
P2Presentation.append(P2Skin)
P2Presentation.append(P2characteristics)



let icon = document.querySelectorAll('.character-icon');
let iconTitle = document.querySelectorAll('.icon-title')
// Añadir la clase selected al primer elemento por defecto
playerSelected(icon[0], iconTitle[0])

document.addEventListener("keydown", function (e) {
  icon[active].classList.remove("player1-selected");
  icon[active].classList.remove("player2-selected");
  iconTitle[active].innerText = " "

  if (e.key == "ArrowLeft" || e.key.toUpperCase() == "A") {
    active = (active == 0) ? icon.length - 1 : active -= 1;
    playerSelected(icon[active], iconTitle[active])

  } else if (e.key == "ArrowRight" || e.key.toUpperCase() == "D") {
    active = (active == icon.length - 1) ? 0 : active += 1;
    playerSelected(icon[active], iconTitle[active])

  } else if (e.key == "ArrowDown" || e.key.toUpperCase() == "S") {
    active = (active < icon.length - 3) ? active += 3 : active
    playerSelected(icon[active], iconTitle[active])

  } else if (e.key == "ArrowUp" || e.key.toUpperCase() == "W") {
    active = (active > 2) ? active -= 3 : active;
    playerSelected(icon[active], iconTitle[active])

  } else if (e.key == " ") {

    if (!P1Selected) {
      P1Selected = characters[active]
      playerSelected(icon[active], iconTitle[active])
      selection.player1 = characters[active]
      sessionStorage.setItem("selection", JSON.stringify(selection));

    } else {

      selection.player2 = characters[active]
      sessionStorage.setItem("selection", JSON.stringify(selection));

      charactersScreen.style.display = "none";
      stagesScreen.style.display = "flex";
      document.body.removeChild(charactersScript);
      let stagesScript = document.createElement("script")
      stagesScript.src = "assets/js/stages.js";
      document.body.appendChild(stagesScript);
    }

    e.preventDefault();
  }

});

function playerSelected(icon, iconTitle) {
  iconSound.play();
  if (!P1Selected) {
    icon.classList.add("player1-selected");
    iconTitle.innerText = "P1"

    P1Skin.src = characters[active].skin
    P1Title.innerText = characters[active].name
    P1characteristics.innerText = `
    SUBJECT: ${characters[active].characteristics.subject}
    RESISTANCE: ${characters[active].characteristics.resistance}
    JUMP:   ${characters[active].characteristics.jump}
    VELOCITY:  ${characters[active].characteristics.velocity}`

    P2Skin.src = characters[1].skin
    P2Title.innerText = characters[1].name
    P2characteristics.innerText = `
    SUBJECT: ${characters[1].characteristics.subject}
    RESISTANCE: ${characters[1].characteristics.resistance}
    JUMP:   ${characters[1].characteristics.jump}
    VELOCITY:  ${characters[1].characteristics.velocity}`


  } else {
    icon.classList.add("player2-selected");
    iconTitle.innerText = "P2"

    P2Skin.src = characters[active].skin
    P2Title.innerText = characters[active].name
    P2characteristics.innerText = `
    SUBJECT: ${characters[active].characteristics.subject}
    RESISTANCE: ${characters[active].characteristics.resistance}
    JUMP:   ${characters[active].characteristics.jump}
    VELOCITY:  ${characters[active].characteristics.velocity}`
  }
}
