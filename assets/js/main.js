const P1HealthBar = document.querySelector('#player1-health')
const P2HealthBar = document.querySelector('#player2-health')
const gameAlert = document.querySelector('#game-alert')
const clock = document.querySelector('#timer')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const gravity = 0.7

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: './assets/img/stages/Escuela2.png'
})

const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: './assets/img/Cupini-Idle.png',
  scale: 0.25,
  framesMax: 4,
  offset: { x: 15, y: 0 },
  sprites: {
    idle: {
      imageSrc: './assets/img/Cupini-Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './assets/img/Cupini-Run.png',
      framesMax: 4
    },
    jump: {
      imageSrc: './assets/img/Cupini-Jump.png',
      framesMax: 4
    },
    punch: {
      imageSrc: './assets/img/Cupini-Punch.png',
      framesMax: 4
    }
  }
})

const enemy = new Fighter({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 }
})

//infinitive Loop
function animate() {
  window.requestAnimationFrame(animate)

  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  player.update()
  //enemy.update()
  player.velocity.x = 0
  enemy.velocity.x = 0

  //Movimiento de P1

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprites('run')

  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprites('run')

  } else {
    player.switchSprites('idle')
  }

  if (player.velocity.y < 0) {
    player.switchSprites('jump')
  }
  //Movimiento de P2
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
  }

  //Detectar ataque de P1 a P2
  if (rectagularCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttaking) {
    player.isAttaking = false
    enemy.health -= 20
    P2HealthBar.style.width = enemy.health + '%'
  }

  //Detectar ataque de P2 a P1
  if (rectagularCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttaking) {
    enemy.isAttaking = false
    player.health -= 20
    P1HealthBar.style.width = player.health + '%'
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
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
      break;

    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
      break;

    case 'w':
      player.velocity.y = -20
      break;

    case 'g':
      player.attack()
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastKey = 'ArrowRight'
      break;

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
      break;

    case 'ArrowUp':
      enemy.velocity.y = -20
      break;

    case 'm':
      enemy.attack()
      break;
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break;
    case 'a':
      keys.a.pressed = false
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break;
  }
})