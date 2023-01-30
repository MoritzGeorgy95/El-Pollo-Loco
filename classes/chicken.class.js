class Chicken extends MovableObject {


    IMAGES_WALKING= ["img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"]
    currentImg= 0;


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.y= 433 - this.height;
        this.width= 80;
        this.height= 80;
        this.x= 2000 - Math.random() * 2000;
        this.speed= 0.3+ Math.random();
        this.animate();
    }

    animate() {

        setInterval(() => {
            let i= this.currentImg % this.IMAGES_WALKING.length;
            let path= this.IMAGES_WALKING[i];
            this.img= this.imgCache[path];
            this.currentImg++;
        }, 100);
    }



    incrementX() {
        if(this.x > 0-this.width) {
            this.x -= this.speed;
        }

        else {
            this.x = 2158;
        }
    }
}