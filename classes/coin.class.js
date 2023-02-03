class Coin extends CollectableObject {
    
    IMAGES= [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png"
    ]

    constructor() {
        super();
        this.loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES);
        this.x = 2800 * Math.random() + 100;
        // this.y= 60 
        this.y= 60;
        this.width= 150;
        this.height= 150;
    }
}