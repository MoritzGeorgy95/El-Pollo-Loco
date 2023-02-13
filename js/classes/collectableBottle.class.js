class collectableBottle extends CollectableObject {
    
    currentImg= 0;
    

    constructor() {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = 2800 * Math.random() + 180;
        this.width= 100;
        this.height= 80;
        this.y= 430 - this.height - 200 * Math.random();
    }

}