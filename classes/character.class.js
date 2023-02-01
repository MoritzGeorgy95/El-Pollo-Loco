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

  currentImg = 0;
  characterSpeed = 50;
  health = 100;
  isColliding;
  isDead;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.y = 270 - this.height;
    this.width = 200;
    this.height = 250;
    this.reversed = false;
    this.setGameLoop();
  }

  setGameLoop() {
    setInterval(() => {
      this.animateWalk();
      this.animateJump();
      this.moveRight();
      this.moveLeft();
      this.jump();
      this.collision();
      this.checkHealth();
      this.animateDeath();}, 100);
  }

  checkHealth() {
    if (this.health < 100 && this.health >= 80) {
      this.world.healthbar.img.src = this.world.healthbar.images[1];
    } else if (this.health < 80 && this.health >= 60) {
      this.world.healthbar.img.src = this.world.healthbar.images[2];
    } else if (this.health < 60 && this.health >= 40) {
      this.world.healthbar.img.src = this.world.healthbar.images[3];
    } else if (this.health < 40 && this.health >= 20) {
      this.world.healthbar.img.src = this.world.healthbar.images[4];
    } else if (this.health < 20 && this.health >= 0) {
      this.world.healthbar.img.src = this.world.healthbar.images[5];
    }
    if (this.health <= 0) {
      this.isDead = true;
    }
  }

  animateDeath() {
      if (this.isDead) {
        let i = this.currentImg % this.IMAGES_DEAD.length;
        let path = this.IMAGES_DEAD[i];
        this.img = this.imgCache[path];
        this.currentImg++;
      }
  }

  animateHurt() {
    let i = this.currentImg % this.IMAGES_HURT.length;
    let path = this.IMAGES_HURT[i];
    this.img = this.imgCache[path];
    this.currentImg++;
  }

  collision() {
      this.world.enemies.forEach((enemy) => {
        if (enemy.x <= this.x + this.width - 50 && enemy.x > this.x) {
          this.isColliding = true;
          this.health -= 1;
          this.animateHurt();
        } else {
          this.isColliding = false;
        }
      });
  }

  animateWalk() {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImg % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imgCache[path];
        this.currentImg++;
      }
  }

  animateJump() {
      if (this.world.keyboard.SPACE) {
        let i = this.currentImg % this.IMAGES_JUMPING.length;
        let path = this.IMAGES_JUMPING[i];
        this.img = this.imgCache[path];
        this.currentImg++;
      }
  }

  moveRight() {
      if (this.world.keyboard.RIGHT && this.x + this.width <= 2400) {
        this.world.ctx.translate(-30, 0);
        this.world.audio_right.play();
        this.x += 30;
        this.world.healthbar.x += 30;
        this.reversed = false;
      } else {
        this.world.audio_right.pause();
      }
  }

  moveLeft() {
      if (this.world.keyboard.LEFT && this.x >= 120 + 5) {
        this.world.ctx.translate(30, 0);
        this.world.audio_left.play();
        this.x -= 30;
        this.world.healthbar.x -= 30;
        this.reversed = true;
      } else {
        this.world.audio_left.pause();
      }
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
}
