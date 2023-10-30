const P1HealthBar = document.querySelector('#player1-health')
const P2HealthBar = document.querySelector('#player2-health')
const gameAlert = document.querySelector('#game-alert')
const clock = document.querySelector('#timer')

//Sounds
let soundtrack = new Audio(selection.stage.soundtrack);
let takeHitSound = new Audio("./assets/sounds/TakeHit.mp3");
let winnerSound = new Audio("./assets/sounds/Winner.mp3");


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1358
canvas.height = 654
console.log(window.innerWidth + "x" + window.innerHeight)

const gravity = 0.7

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: selection.stage.background
})

const player = new Fighter({
  position: { x: 100, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: selection.player1.sprites.idle,
  scale: 0.25,
  framesMax: 4,
  offset: { x: 50, y: 0 },
  sprites: selection.player1.sprites,
  stadistics: selection.player1.stadistics,
  attackBox: {
    offset: {
      x: 55,
      y: 50
    },
    width: 45,
    height: 10
  }
})

const enemy = new Fighter({
  position: { x: 1200, y: 100 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 },
  imageSrc: selection.player2.sprites.idle,
  scale: 0.25,
  framesMax: 4,
  offset: { x: -50, y: 0 },
  sprites: selection.player2.sprites,
  stadistics: selection.player2.stadistics,
  attackBox: {
    offset: {
      x: -35,
      y: 50
    },
    width: 45,
    height: 10
  },
  player2: true

})

//infinitive Loop
function animate() {
  window.requestAnimationFrame(animate)

  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  //Movimiento de P1
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -player.stadistics.velocity
    player.switchSprites('run')

  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = player.stadistics.velocity
    player.switchSprites('run')

  } else {
    player.switchSprites('idle')
  }
  if (player.velocity.y < 0) {
    player.switchSprites('jump')
  }

  //Movimiento de P2
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -enemy.stadistics.velocity
    enemy.switchSprites('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = enemy.stadistics.velocity
    enemy.switchSprites('run')
  } else {
    enemy.switchSprites('idle')
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprites('jump')
  }

  //Detectar ataque de P1 a P2
  if (rectagularCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttaking && player.framesCurrent === 3) {
    player.isAttaking = false
    enemy.takeHit()
    P2HealthBar.style.width = enemy.health + '%'
  }

  //Detectar si P1 falla
  if (player.isAttaking && player.framesCurrent === 3) {
    player.isAttaking = false
  }
  //Detectar ataque de P2 a P1
  if (rectagularCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttaking && enemy.framesCurrent === 3) {
    enemy.isAttaking = false
    player.takeHit()
    P1HealthBar.style.width = player.health + '%'
  }

  //Detectar si P2 falla
  if (enemy.isAttaking && enemy.framesCurrent === 3) {
    enemy.isAttaking = false
  }

  //Detecta si uno de los dos se le acaba la vida.
  if (enemy.health <= 0 || player.health <= 0) {
    determinateWinner({ player, enemy, timerId })
  }
}


decreaseTimer()

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
}

animate();

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key.toLowerCase()) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break;

      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break;

      case 'w':
        if (player.velocity.y == 0) {
          player.velocity.y = -player.stadistics.jump
        }
        break;

      case 'v':
        player.punch()
        break;

      case 'b':
        player.kick()
        break;

      case 's':
        player.dance()
        break;

    }
  }

  if (!enemy.dead) {
    switch (event.key.toLowerCase()) {
      case 'arrowright':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break;

      case 'arrowleft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break;

      case 'arrowup':
        if (enemy.velocity.y == 0) {
          enemy.velocity.y = -enemy.stadistics.jump
        }
        break;

      case 'arrowdown':
        enemy.dance()
        break;

      case 'o':
        enemy.punch()
        break;

      case 'p':
        enemy.kick()
        break;
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key.toLowerCase()) {
    case 'd':
      keys.d.pressed = false
      break;
    case 'a':
      keys.a.pressed = false
      break;

    case 'arrowright':
      keys.ArrowRight.pressed = false
      break;
    case 'arrowleft':
      keys.ArrowLeft.pressed = false
      break;
  }
})
