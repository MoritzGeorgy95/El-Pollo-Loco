class Healthbar extends Statusbar{
    x= 20;
    y= 0; 
    width= 150;
    height= 45;
    img;

    images= [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png"
    ]

    constructor() {
        super();
        this.img= new Image();
        this.img.src= this.images[5];
        this.loadImages(this.images);
    }

}