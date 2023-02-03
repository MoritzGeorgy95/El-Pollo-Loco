class CollectableObject {
    x;
    y;
    width;
    height;
    img;
    imgCache= {};
   
    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imgCache[path] = img;
        });
      }
}