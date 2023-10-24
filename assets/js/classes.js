
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
  constructor({ position, velocity, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites }) {
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
      offset: offset,
      width: 100,
      height: 50,
    }
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 10
    this.sprites = sprites

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  update() {
    this.draw()
    this.animateFrames()

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    //Si toca el borde inferior se detiene, sino añade mas velocidad (gravedad)
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 10) {
      this.velocity.y = 0

    } else {
      this.velocity.y += gravity
    }
  }

  attack() {
    this.switchSprites('punch')
    this.isAttaking = true
    setTimeout(() => {
      this.isAttaking = false
    }, 100);
  }

  switchSprites(sprite) {

    if (this.image === this.sprites.punch.image && this.framesCurrent < this.sprites.punch.framesMax - 1) return
    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          /* this.framesCurrent = 0 */
        }

        break;
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          /* this.framesCurrent = 0 */
        }
        break;
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          /* this.framesCurrent = 0 */
        }
        break;
      case 'punch':
        if (this.image !== this.sprites.punch.image) {
          this.image = this.sprites.punch.image
          this.framesMax = this.sprites.punch.framesMax
          this.framesCurrent = 0
        }
        break;
    }
  }
}