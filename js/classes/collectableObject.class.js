class CollectableObject {
    x;
    y;
    width;
    height;
    img;
    imgCache= {};
    coinSound= new Audio();
    bottleSound= new Audio();
   
    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
      this.coinSound.src= "audio/coin.mp3"
      this.bottleSound.src= "audio/bottleCollect.mp3"
    }

    loadImages(arr) {
        arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imgCache[path] = img;
        });
      }
}