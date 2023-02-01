class Bottle {
  x = 300;
  y= 100;
  width= 100;
  height= 80;
  img;

  constructor() {
    this.img= new Image();
    this.img.src= "img/6_salsa_bottle/salsa_bottle.png";
  }

  throw() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImg % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imgCache[path];
        this.currentImg++;
      }
  }

}
