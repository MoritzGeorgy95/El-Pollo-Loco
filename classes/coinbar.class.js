class Coinbar extends Statusbar{
    x= 440;
    y= 0; 
    width= 200;
    height= 60;
    img;

    images= [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png"
    ]

    constructor() {
        super();
        this.img= new Image();
        this.img.src= this.images[0];
        this.loadImages(this.images);
    }
}