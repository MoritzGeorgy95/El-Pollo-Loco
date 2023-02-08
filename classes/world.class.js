class World {
  character = new Character();
  clouds = new Cloud();
  // audio_left = new Audio();
  // audio_right = new Audio();
  enemies = [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken()];
  win= new Audio();
  gameover= new Audio();
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
  bottlebar= new Bottlebar();
  coinbar= new Coinbar();
  bottle= new Bottle(this.character.x, this.character.y+100);
  coins= [new Coin(), new Coin(),new Coin(),new Coin(),new Coin()];
  collectableBottles= [new collectableBottle(),new collectableBottle(),new collectableBottle(),new collectableBottle(),new collectableBottle()];
  ctx;
  keyboard;
  endboss= new Endboss(this.bottle);  
  constructor(canvas, keyboard) {
    this.win.src= "audio/gamewinner.mp3";
    this.gameover.src= "audio/gameover.mp3";
    this.canvas = canvas;
    // this.audio_left.src = "audio/walking.mp3";
    // this.audio_right.src = "audio/walking.mp3";
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.drawGame();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
    this.bottle.world= this;
    this.endboss.world= this;
    // this.enemies.forEach((enemy)=>{
    //   enemy.world= this;
    // })
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
      
    });
  }

  drawEndboss() {
    this.ctx.drawImage(
      this.endboss.img,
      this.endboss.x,
      this.endboss.y,
      this.endboss.width,
      this.endboss.height
    ); 
  }

  drawCoins() {
    this.coins.forEach((coin) => {
      this.ctx.drawImage(
        coin.img,
        coin.x,
        coin.y,
        coin.width,
        coin.height
      );  
  })
}

  drawCollectableBottles() {
    this.collectableBottles.forEach((bottle) => {
      this.ctx.drawImage(
        bottle.img,
        bottle.x,
        bottle.y,
        bottle.width,
        bottle.height
      );  
  })
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

  drawBottlebar() {
    this.ctx.drawImage(
      this.bottlebar.img,
      this.bottlebar.x,
      this.bottlebar.y,
      this.bottlebar.width,
      this.bottlebar.height
    ); 
  }

  drawCoinbar() {
    this.ctx.drawImage(
      this.coinbar.img,
      this.coinbar.x,
      this.coinbar.y,
      this.coinbar.width,
      this.coinbar.height
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

  drawbottle() {
        if(this.bottle.isThrown) {
          this.ctx.drawImage(
            this.bottle.img,
            this.bottle.x,
            this.bottle.y,
            this.bottle.width,
            this.bottle.height
          );
        }
    }
  

  drawGame() {
    this.drawBackground(this.background.section1, 0);
    this.drawBackground(this.background.section2, 719);
    this.drawBackground(this.background.section1, 1438);
    this.drawBackground(this.background.section2, 2157);
    this.drawBackground(this.background.section1, 2876);
    this.drawBackground(this.background.section2, 3595);
    this.drawBackground(this.background.section1, 4314);
    this.drawBackground(this.background.section2, 5033);
    this.drawClouds();
    this.drawEnemies();
    this.drawEndboss();
    this.drawHealthBar();
    this.drawBottlebar();
    this.drawCoinbar();
    this.drawbottle();
    this.drawCoins();
    this.drawCollectableBottles();
    
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
