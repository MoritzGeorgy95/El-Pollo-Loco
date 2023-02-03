class collectableBottle extends CollectableObject {
    
    
    constructor() {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = 2800 * Math.random() + 150;
        this.y= 60 + 250 * Math.random();
        this.width= 100;
        this.height= 80;
       
    }
}