class Bottlebar extends Statusbar {
    x= 180;
    y= 0; 
    width= 150;
    height= 45;
    img; 

    images= [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png"
    ]

    constructor() {
        super();
        this.img= new Image();
        this.img.src= this.images[0];
        this.loadImages(this.images);
    }
}