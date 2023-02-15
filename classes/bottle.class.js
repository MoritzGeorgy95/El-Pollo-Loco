class Bottle extends MovableObject {
  //bottle's attributes
  width = 100;
  height = 80;
  img;
  IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  
  speed = 50;
  isThrown;
  currentImg = 0;
  bottleSound = new Audio();

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES);
    this.throw();
    this.animate();
    this.checkCollision();
    this.x = x;
    this.y = y;
    this.bottleSound.src = "audio/bottleThrow.mp3";
  }

  throw() {
    setInterval(() => {
      if (this.world.keyboard.E) {
        this.throwRight();
      } else if (this.world.keyboard.E && this.world.character.reversed) {
        this.throwLeft();
      }
    }, 1000 / 25);
  }

  throwRight() {
    if (this.world.character.bottles > 0) {
      this.handleFlight();

      if (this.y >= 420) {
        this.handleDrop();
      }
    } else {
      this.world.keyboard.E = false;
    }
  }

  throwLeft() {
    if (this.world.character.bottles > 0) {
      this.handleFlightReversed();

      if (this.y >= 420) {
        this.handleDrop();
      }
    } else {
      this.world.keyboard.E = false;
    }
  }

  animate() {
    setInterval(() => {
      if (this.isThrown) {
        let i = this.currentImg % this.IMAGES.length;
        let path = this.IMAGES[i];
        this.img = this.imgCache[path];
        this.currentImg++;
      }
    }, 80);
  }

  checkCollision() {
    setInterval(() => {
      for (let i = 0; i < this.world.enemies.length; i++) {
        const enemy = this.world.enemies[i];
        if (this.collisionConditions(enemy)) {
          enemy.animateDeath();
          setTimeout(() => {
            this.world.enemies.splice(i, 1);
          }, 500);
        }
      }
    }, 100);
  }

  collisionConditions(enemy) {
    return (
      this.isThrown &&
      this.x + this.width + 20 > enemy.x &&
      this.x < enemy.x + enemy.width &&
      this.y + this.height > enemy.y
    );
  }

  handleFlight() {
    this.isThrown = true;
    this.animationCounter = 0;
    this.y -= this.speed;
    this.speed -= 10;
    this.x += 25;
    if (soundOn) {
      this.bottleSound.play(); 
    }
  }

  handleFlightReversed() {
    this.isThrown = true;
    this.animationCounter = 0;
    this.y -= this.speed;
    this.speed -= 10;
    this.x -= 60;
    if (soundOn) {
      this.bottleSound.play();      
    }
  }

  handleDrop() {
    this.world.keyboard.E = false;
    this.speed = 50;
    this.isThrown = false;
    this.x = this.world.character.x;
    this.y = this.world.character.y + 100;
    this.world.character.bottles--;
  }
  
}
