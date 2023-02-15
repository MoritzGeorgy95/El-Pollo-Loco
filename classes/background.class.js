class Background {

    x= 0; 
    y= 0;
    width= 720;
    height= 480;
    section1=[];
    section2= [];

    constructor(arr1, arr2) {
            arr1.forEach((path) => {
              let img = new Image();
              img.src = path;
              this.section1.push(img);
            });
            arr2.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.section2.push(img);
              });
          }
}
