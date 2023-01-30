class Cloud extends MovableObject{
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/2.png');
        this.y= 0;
        this.x= 20;
        this.width= 150;
    }

    incrementX() {
        if(this.x < 720) {
            this.x += .7;
        }

        else {
            this.x = 0;
        }
    }


}