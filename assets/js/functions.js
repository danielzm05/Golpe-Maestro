function rectagularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

function determinateWinner({ player, enemy }) {
  clearTimeout(timerId)
  gameAlert.style.display = 'flex'

  if (player.health === enemy.health) {
    gameAlert.innerHTML = 'TIE'
  } else if (player.health > enemy.health) {
    gameAlert.innerHTML = selection.player1.name + " WINS"
  } else if (player.health < enemy.health) {
    gameAlert.innerHTML = selection.player2.name + " WINS"
  }
}

let timer = 60
let timerId
function decreaseTimer() {

  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    clock.innerHTML = timer
  }
  if (timer >= 59) {
    soundtrack.volume = 0.2
    soundtrack.play()
  }

  if (timer === 0) {
    determinateWinner({ player, enemy, timerId })
    soundtrack.pause()
    winnerSound.play()
  }
}