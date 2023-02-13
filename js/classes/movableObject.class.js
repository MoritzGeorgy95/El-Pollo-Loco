class MovableObject {
  x = 120;
  y = 0;
  width = 100;
  height = 100;
  img;
  imgCache={};
  reversed= false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * 
   * preload images handler for objects to avoid buggy and slow img loading
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

}