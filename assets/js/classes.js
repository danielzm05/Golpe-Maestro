
class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 10
    this.offset = offset
  }
  draw() {

    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale)
  }

  animateFrames() {
    this.framesElapsed++
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
}

class Fighter extends Sprite {
  constructor({ position, velocity, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites, stadistics, attackBox = { offset: {}, width: undefined, height: undefined }, player2 = false }) {
    super({ position, imageSrc, scale, framesMax, offset })
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.health = 100
    this.lastKey
    this.isAttaking
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    }
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 10
    this.sprites = sprites
    this.stadistics = stadistics
    this.player2 = player2
    this.dead = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  update() {
    if (this.player2) {
      // Dibujar el objeto invertido horizontalmente
      c.save();
      c.scale(-1, 1);
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        -this.position.x - this.offset.x - (this.image.width / this.framesMax) * this.scale, // Nota: se debe restar el ancho del objeto al eje X para que no se salga del canvas
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale)
      c.restore();
    } else {
      this.draw()
    }

    if (!this.dead) {
      this.animateFrames()
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y
    /* c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height) */
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    //Borde Izquierdo 
    if (this.position.x <= 0) {
      this.position.x = 0
    }

    //Borde Derecho
    if (this.position.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width
    }

    //Si toca el borde inferior se detiene, sino añade mas velocidad (gravedad)
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 10) {
      this.velocity.y = 0

    } else {
      this.velocity.y += gravity
    }
  }

  dance() {
    this.switchSprites('dance')
  }

  punch() {
    this.switchSprites('punch')
    this.isAttaking = true
  }

  kick() {
    this.switchSprites('kick')
    this.isAttaking = true
  }

  takeHit() {
    takeHitSound.play()
    this.health -= 5

    if (this.health <= 0) {
      this.switchSprites('death')
      soundtrack.pause()
      winnerSound.play()
    } else this.switchSprites('takeHit')
  }

  switchSprites(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true
      return
    }
    if (this.image === this.sprites.punch.image && this.framesCurrent < this.sprites.punch.framesMax - 1) return
    if (this.image === this.sprites.kick.image && this.framesCurrent < this.sprites.kick.framesMax - 1) return
    if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return
    if (this.image === this.sprites.dance.image && this.framesCurrent < this.sprites.dance.framesMax - 1) return
    if (this.image === this.sprites.jump.image && this.framesCurrent < this.sprites.jump.framesMax - 1) return
    switch (sprite) {

      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
        }
        break;

      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.framesCurrent = 0
        }
        break;

      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.framesCurrent = 0
        }
        break;

      case 'punch':
        if (this.image !== this.sprites.punch.image) {
          this.image = this.sprites.punch.image
          this.framesMax = this.sprites.punch.framesMax
          this.framesCurrent = 0
        }
        break;
      case 'kick':
        if (this.image !== this.sprites.kick.image) {
          this.image = this.sprites.kick.image
          this.framesMax = this.sprites.kick.framesMax
          this.framesCurrent = 0
        }
        break;
      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image
          this.framesMax = this.sprites.takeHit.framesMax
          this.framesCurrent = 0
        }
        break;
      case 'dance':
        if (this.image !== this.sprites.dance.image) {
          this.image = this.sprites.dance.image
          this.framesMax = this.sprites.dance.framesMax
          this.framesCurrent = 0
        }
        break;
      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.framesMax = this.sprites.death.framesMax
          this.framesCurrent = 0
        }
        break;
    }

  }
}

