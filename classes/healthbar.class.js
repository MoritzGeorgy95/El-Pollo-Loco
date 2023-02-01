class Healthbar {
    x= 100;
    y= 10; 
    width= 200;
    height= 60;
    img;

    images= [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png"
    ]

    constructor() {
        this.img= new Image();
        this.img.src= this.images[0];
    }

}