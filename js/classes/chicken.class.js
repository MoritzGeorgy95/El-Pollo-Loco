class Chicken extends MovableObject {

    //object's attributes like sprites sounds etc.
    hurt= new Audio();
    isDead=false;
    IMAGES_WALKING= ["img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"]

    IMAGES_DEAD= ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"]; 
    currentImg= 0;

 
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.y= 433 - this.height;
        this.width= 80;
        this.height= 80;
        this.x= 4500 - (Math.random() * 4500 - 300);
        this.speed= 0.3+ Math.random();
        this.animate();
        
        // this.incrementX(); 
        this.hurt.src= "audio/chickenHurt.mp3";
    }

    animate() {

        this.animation= setInterval(() => {
            let i= this.currentImg % this.IMAGES_WALKING.length;
            let path= this.IMAGES_WALKING[i];
            this.img= this.imgCache[path];
            this.currentImg++;
        }, 100);
    }


    animateDeath() {
        this.isDead= true;
        clearInterval(this.animation);
        clearInterval(this.incrementInterval);
        this.height += 60;
        this.hurt.play();
        let path = this.IMAGES_DEAD[0];
        this.img = this.imgCache[path];
    }

    //make chicken (enemy) walk
    incrementX() {

        this.incrementInterval= setInterval(()=> {
            if(this.x > 0-this.width) {
                this.x -= this.speed;
            }
    
            else {
                this.x = 2158;
            }
        }, 1000/60)
    }
       
}