class Bottle extends MovableObject{
  width = 100;
  height = 80;
  img;
  IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  // SPLASH= [
  //   "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
  //   "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
  //   "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
  //   "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
  //   "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
  //   "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  // ];
  speed = 50;
  isThrown;
  currentImg = 0;
  bottleSound= new Audio();

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES);
    this.throw();
    this.animate();
    this.checkCollision();
    this.x = x;
    this.y = y;
    this.bottleSound.src= "audio/bottleThrow.mp3"
  }

  throw() {
    setInterval(() => {
      if (this.world.keyboard.E) {
        if(this.world.character.bottles > 0) {
          this.isThrown = true;
          this.animationCounter = 0;
          this.y -= this.speed;
          this.speed -= 10;
          this.x += 25;
          this.bottleSound.play();
  
          if (this.y >= 420) {
            this.world.keyboard.E = false;
            this.speed = 50;
            this.isThrown = false;
            this.x = this.world.character.x;
            this.y = this.world.character.y+100;
            this.world.character.bottles--;
          }
        }
        else {
          this.world.keyboard.E = false;
        }
      }
    }, 1000 / 25);
  }

  animate() {
    setInterval(()=> {
        if(this.isThrown) {
            let i = this.currentImg % this.IMAGES.length;
            let path = this.IMAGES[i];
            this.img = this.imgCache[path];
            this.currentImg++;
        }
    },80)
  }

  checkCollision() {
    setInterval(()=> {
      for (let i = 0; i < this.world.enemies.length; i++) {
        const enemy= this.world.enemies[i];
        if(this.isThrown && this.x + this.width > enemy.x && this.x < enemy.x + enemy.width && this.y + this.height > enemy.y) {
          console.log('hit');
          enemy.animateDeath();
          setTimeout(()=> {this.world.enemies.splice(i, 1);}, 500)
    }
      }     
    }, 100)
  }


  // animateSplash() {
  //   setInterval(()=> {
  //         let i = this.currentImg % this.SPLASH.length;
  //         let path = this.SPLASH[i];
  //         this.img = this.imgCache[path];
  //         this.currentImg++;
      
  // },80)}
}