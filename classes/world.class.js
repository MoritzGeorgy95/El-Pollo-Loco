class World {
  character = new Character();
  clouds = new Cloud();
  audio_left = new Audio();
  audio_right = new Audio();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  background = new Background(
    [
      "img/5_background/layers/air.png",
      "img/5_background/layers/3_third_layer/1.png",
      "img/5_background/layers/2_second_layer/1.png",
      "img/5_background/layers/1_first_layer/1.png",
    ],
    [
      "img/5_background/layers/air.png",
      "img/5_background/layers/3_third_layer/2.png",
      "img/5_background/layers/2_second_layer/2.png",
      "img/5_background/layers/1_first_layer/2.png",
    ]
  );
  healthbar= new Healthbar();
  bottle= new Bottle();
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.audio_left.src = "audio/walking.mp3";
    this.audio_right.src = "audio/walking.mp3";
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.drawGame();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
    this.bottle.world = this;
  }


  drawBackground(arr, y) {
    arr.forEach((img)=> {
      this.ctx.drawImage(
        img,
        y,
        this.background.y,
        this.background.width,
        this.background.height
      );
    })
  }

  drawClouds() {
    this.ctx.drawImage(
      this.clouds.img,
      this.clouds.x,
      this.clouds.y,
      this.clouds.width,
      this.clouds.height
    );
    this.clouds.incrementX();

  }

  drawEnemies() {
    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(
        enemy.img,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
      // enemy.incrementX();
      
    });
  }

  drawHealthBar() {
    this.ctx.drawImage(
      this.healthbar.img,
      this.healthbar.x,
      this.healthbar.y,
      this.healthbar.width,
      this.healthbar.height
    ); 
  }

  drawCharacterLeft() {
    this.ctx.save();
    this.ctx.translate(this.character.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(
      this.character.img,
      -this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );
    this.ctx.restore();
  }

  drawCharacterRight(){
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );
  }

  drawBottle() {
    this.ctx.drawImage(
      this.bottle.img,
      this.bottle.x,
      this.bottle.y,
      this.bottle.width,
      this.bottle.height
    );
  }

  drawGame() {
    this.drawBackground(this.background.section1, 0);
    this.drawBackground(this.background.section2, 719);
    this.drawBackground(this.background.section1, 1438);
    this.drawBackground(this.background.section2, 2157);
    this.drawClouds();
    this.drawEnemies();
    this.drawHealthBar();
    this.drawBottle();
    
    if (this.character.reversed) {
     this.drawCharacterLeft();
    }
    if (!this.character.reversed) {
     this.drawCharacterRight();
    }

    requestAnimationFrame(() => {
      this.drawGame();
    });
  }
}
