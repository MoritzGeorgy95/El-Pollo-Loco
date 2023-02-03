
class Character extends MovableObject {
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_STANDING = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
    // "img/2_character_pepe/1_idle/long_idle/I-11.png",
    // "img/2_character_pepe/1_idle/long_idle/I-12.png",
    // "img/2_character_pepe/1_idle/long_idle/I-13.png",
    // "img/2_character_pepe/1_idle/long_idle/I-14.png",
    // "img/2_character_pepe/1_idle/long_idle/I-15.png",
    // "img/2_character_pepe/1_idle/long_idle/I-16.png",
    // "img/2_character_pepe/1_idle/long_idle/I-17.png",
    // "img/2_character_pepe/1_idle/long_idle/I-18.png",
    // "img/2_character_pepe/1_idle/long_idle/I-19.png",
    // "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  currentImg = 0;
  characterSpeed = 50;
  health = 100;
  isColliding;
  isDead;
  isWalking;
  isJumping;
  coins = 0;
  bottles = 0;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STANDING);
    this.width = 200;
    this.height = 250;
    this.y = 170;
    this.reversed = false;
    this.setGameLoop();
    this.updateStatusBars();
    this.animateStanding();
  }

  setGameLoop() {
    setInterval(() => {
      this.animateWalk();
      this.animateJump();
      this.moveRight();
      this.moveLeft();
      this.jump();
      this.collisionControl();

      this.animateDeath();
    }, 1000 / 15);
  }

  updateStatusBars() {
    setInterval(() => {
      this.checkHealth();
      this.checkBottles();
      this.checkCoins();

      this.animateDeath();
    }, 1000 / 60);
  }

  checkHealth() {
    let index = Math.floor(this.health / 20);
    if (this.health <= 0) {
      index = 0;
      this.isDead = true;
    } else if (this.health >= 100) {
      index = 5;
    }
    let path = this.world.healthbar.images[index];
    this.world.healthbar.img = this.world.healthbar.imgCache[path];
  }

  checkBottles() {
    let index = this.bottles / 1;
    let path = this.world.bottlebar.images[index];
    this.world.bottlebar.img = this.world.bottlebar.imgCache[path];
  }

  checkCoins() {
    let index = this.coins / 1;
    let path = this.world.coinbar.images[index];
    this.world.coinbar.img = this.world.coinbar.imgCache[path];
  }

  animateStanding() {
    setInterval(() => {
      if (
        !this.isDead &&
        !this.isColliding &&
        !this.isWalking &&
        !this.isJumping
      ) {
        let i = this.currentImg % this.IMAGES_STANDING.length;
        let path = this.IMAGES_STANDING[i];
        this.img = this.imgCache[path];
        this.currentImg++;
      }
    }, 200);
  }

  animateDeath() {
    if (this.isDead) {
      let i = this.currentImg % this.IMAGES_DEAD.length;
      let path = this.IMAGES_DEAD[i];
      this.img = this.imgCache[path];
      this.currentImg++;
      setTimeout(()=> {renderEndscreen();}, 1000)
    }
  }

  animateHurt() {
    let i = this.currentImg % this.IMAGES_HURT.length;
    let path = this.IMAGES_HURT[i];
    this.img = this.imgCache[path];
    this.currentImg++;
  }

  collisionControl() {
    this.checkCollisonWithEnemy();
    this.checkCollisonWithCoins();
    this.checkCollisonWithBottles();
  }

  animateWalk() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      let i = this.currentImg % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imgCache[path];
      this.currentImg++;
      this.isWalking = true;
    } else {
      this.isWalking = false;
    }
  }

  animateJump() {
    if (this.world.keyboard.SPACE) {
      let i = this.currentImg % this.IMAGES_JUMPING.length;
      let path = this.IMAGES_JUMPING[i];
      this.img = this.imgCache[path];
      this.currentImg++;
      this.isJumping = true;
    } else {
      this.isJumping = false;
    }
  }

  moveRight() {
    if (this.world.keyboard.RIGHT && this.x + this.width <= 4900) {
      this.world.ctx.translate(-30, 0);
      // this.world.audio_right.play();
      this.x += 30;
      this.world.bottle.x += 30;
      this.world.healthbar.x += 30;
      this.world.coinbar.x += 30;
      this.world.bottlebar.x += 30;
      this.reversed = false;
    }
    // } else {
    //   this.world.audio_right.pause();
    // }
  }

  moveLeft() {
    if (this.world.keyboard.LEFT && this.x >= 120 + 5) {
      this.world.ctx.translate(30, 0);
      // this.world.audio_left.play();
      this.x -= 30;
      this.world.bottle.x -= 30;
      this.world.healthbar.x -= 30;
      this.world.coinbar.x -= 30;
      this.world.bottlebar.x -= 30;
      this.reversed = true;
    }
    // } else {
    //   this.world.audio_left.pause();
    // }
  }

  jump() {
    if (this.world.keyboard.SPACE) {
      this.y -= this.characterSpeed;
      this.characterSpeed -= 10;

      if (this.y >= 170) {
        this.world.keyboard.SPACE = false;
        this.characterSpeed = 50;
        this.currentImg = 0;
      }
    }
  }

  checkCollisonWithEnemy() {
    for (let i = 0; i < this.world.enemies.length; i++) {
      const enemy = this.world.enemies[i];
      if (
        enemy.x <= this.x + this.width - 50 &&
        enemy.x > this.x &&
        this.y + this.height > enemy.y && !enemy.isDead
      ) {
        if(this.isJumping) {
          enemy.animateDeath();
          setTimeout(()=> {this.world.enemies.splice(i, 1);}, 500)
  
        }
        else {
          this.isColliding = true;
          this.health -= 1;
          this.animateHurt();
        }
        
      } else {
        this.isColliding = false;
      }
    }
  }
  checkCollisonWithCoins() {
    for (let i = 0; i < this.world.coins.length; i++) {
      let coin = this.world.coins[i];
      if (
        coin.x <= this.x + this.width - 70 &&
        coin.x > this.x &&
        this.y < coin.y + coin.height - 70 &&
        this.height + this.y > coin.y
      ) {
        this.world.coins.splice(i, 1);
        this.coins++;
      }
    }
  }
  checkCollisonWithBottles() {
    for (let i = 0; i < this.world.collectableBottles.length; i++) {
      let bottle = this.world.collectableBottles[i];
      if (
        bottle.x <= this.x + this.width - 70 &&
        bottle.x > this.x &&
        this.y < bottle.y + bottle.height - 70 &&
        this.height + this.y > bottle.y
      ) {
        this.world.collectableBottles.splice(i, 1);
        this.bottles++;
      }
    }
  }
}
