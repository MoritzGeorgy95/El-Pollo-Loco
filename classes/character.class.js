class Character extends MovableObject {
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING= [
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

  currentImg = 0;
  characterSpeed= 50;
  
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.y = 270 - this.height;
    this.width = 200;
    this.height = 250;
    this.reversed = false;
    this.animateWalk();
    this.animateJump();
    this.moveRight();
    this.moveLeft();
    this.jump();
  }

  animateWalk() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImg % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imgCache[path];
        this.currentImg++;
      }
    }, 100);
  }

  animateJump() {
    setInterval(() => {
      if (this.world.keyboard.SPACE) {
        let i = this.currentImg % this.IMAGES_JUMPING.length;
        let path = this.IMAGES_JUMPING[i];
        this.img = this.imgCache[path];
        this.currentImg++;
      }
    }, 100);
  }


  moveRight() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x + this.width <= 1700) {
        this.world.ctx.translate(-30, 0);
        this.world.audio_right.play(); 
        this.x += 30;
        this.reversed = false;
      }
      else {
        this.world.audio_right.pause(); 
      }
    }, 100);
  }

  moveLeft() {
    setInterval(() => {
      if (this.world.keyboard.LEFT && this.x >= 120 + 5) {
        this.world.ctx.translate(30, 0);
        this.world.audio_left.play(); 
        this.x -= 30;
        this.reversed = true;
      }
      else {
        this.world.audio_left.pause(); 
      }
    }, 100);
  }

  jump() {
    setInterval(() => {
      if(this.world.keyboard.SPACE) {
        
        this.y -= this.characterSpeed;
        this.characterSpeed -= 10;

        if(this.y >= 170) {
          this.world.keyboard.SPACE = false;
          this.characterSpeed= 50;
          // this.img.src= "img/2_character_pepe/1_idle/idle/I-1.png";
        }

      }
    }
     
    , 100);
   
  }
}
