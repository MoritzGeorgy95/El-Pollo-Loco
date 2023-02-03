class Statusbar {
    imgCache= {};

    loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imgCache[path] = img;
      });
    }
}