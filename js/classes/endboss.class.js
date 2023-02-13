class Endboss extends MovableObject {
  isDead = false;
  hurt= new Audio();
  alert= new Audio();
  endbossActivated= false;
  bottle;
  health= 100;
  currentImg= 0;  
  gettingHit= false;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  currentImg = 0;

  constructor(bottle) {
    super().loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.y = 85;
    this.width = 300;
    this.height = 350;
    this.x = 4900;
    this.speed = 9;
    this.walk();
    this.checkState();
    this.animateWalk();
    this.animateHurt();
    this.animateDead();
    this.bottle= bottle;
    this.hurt.src= "audio/endbossHurt.mp3";
    this.alert.src= "audio/endbossAlert.mp3";
  }


  walk() {
    setInterval(() => {
      if (this.world.character.x > 4350 || this.endbossActivated) {
        this.endbossActivated= true;
        this.x -= this.speed;
        this.alert.play();
        if (this.x <= 0) {
           this.x= 4350; 
        }
      } 
    }, 100);
  }

  checkState() {
      setInterval(()=> {
        if(this.bottle.isThrown && this.bottle.x > this.x && this.bottle.x < this.x + this.width) {
            this.health -= 14;
            this.gettingHit= true;
            this.hurt.play();
        }

        else if(this.health <= 0) {
            this.endbossActivated= false;
            this.gettingHit= false;
            this.isDead= true;
            this.world.win.play();
            gameAudio.pause();
            
            setTimeout(()=> {
              renderEndscreen();
              for (let i = 1; i < 100; i++) {
                window.clearInterval(i);
              }
              }, 3000);
        }

        else {
            this.gettingHit= false;
        }
    }, 100)
    
  }


  animateWalk() {
        setInterval(() => {
        if(this.endbossActivated) {
            let i = this.currentImg % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imgCache[path];
            this.currentImg++;
        }    
       
    }, 100);
  }

    animateHurt() {
        setInterval(() => {
            if(this.gettingHit) {
                let i = this.currentImg % this.IMAGES_HURT.length;
                let path = this.IMAGES_HURT[i];
                this.img = this.imgCache[path];
                this.currentImg++;
            }
          }, 100);
    }

    animateDead() {
        setInterval(() => {
            if(this.isDead) {
                let i = this.currentImg % this.IMAGES_DEAD.length;
                let path = this.IMAGES_DEAD[i];
                this.img = this.imgCache[path];
                this.currentImg++;
            }
          }, 100);
    }
}
