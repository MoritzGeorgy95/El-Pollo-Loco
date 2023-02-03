class Chicken extends MovableObject {

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
        this.x= 2000 - (Math.random() * 2000 - 300);
        this.speed= 0.3+ Math.random();
        this.animate();
        this.incrementX(); 
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
        // this.y += 10;
        let path = this.IMAGES_DEAD[0];
        this.img = this.imgCache[path];
    }

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