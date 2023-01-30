
class World {
    character= new Character();
    clouds= new Cloud();
    audio_left= new Audio();
    audio_right= new Audio();
    enemies= [new Chicken(), new Chicken(), new Chicken()];
    background= new Background(
        [   
            "img/5_background/layers/air.png",
            "img/5_background/layers/3_third_layer/1.png",
            "img/5_background/layers/2_second_layer/1.png",
            "img/5_background/layers/1_first_layer/1.png"
        ], [   
            "img/5_background/layers/air.png",
            "img/5_background/layers/3_third_layer/2.png",
            "img/5_background/layers/2_second_layer/2.png",
            "img/5_background/layers/1_first_layer/2.png"
        ]
    );
    ctx;
    keyboard;
    drawCounter= 0;

    constructor(canvas, keyboard) {
        this.canvas= canvas;
        this.audio_left.src= 'audio/walking.mp3';
        this.audio_right.src= 'audio/walking.mp3';
        this.keyboard= keyboard;
        this.ctx= canvas.getContext('2d');
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }
   
  
    draw(){
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.background.section1[0], 0, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.background.section1[1], 0, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.background.section1[2], 0, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.background.section1[3], 0, this.background.y, this.background.width, this.background.height);
        
        this.ctx.drawImage(this.background.section2[0], 719, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.background.section2[1], 719, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.background.section2[2], 719, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.background.section2[3], 719, this.background.y, this.background.width, this.background.height);
        
        this.ctx.drawImage(this.background.section1[0], 1438, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.background.section1[1], 1438, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.background.section1[2], 1438, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.background.section1[3], 1438, this.background.y, this.background.width, this.background.height);
        
        
        
        // this.ctx.drawImage(this.background.img, 720, this.background.y, this.background.width, this.background.height);
        // this.ctx.drawImage(this.background.img, 1440, this.background.y, this.background.width, this.background.height);
        // this.ctx.drawImage(this.background.img, 2160, this.background.y, this.background.width, this.background.height);
        this.ctx.drawImage(this.clouds.img, this.clouds.x, this.clouds.y, this.clouds.width, this.clouds.height);
        this.clouds.incrementX();
        this.enemies.forEach(
            enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
            enemy.incrementX();
            }
        )
        if(this.character.reversed) {
            this.ctx.save();
            this.ctx.translate(this.character.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(this.character.img, -this.character.x, this.character.y, this.character.width, this.character.height);
            this.ctx.restore();
        }
        if(this.character.reversed == false) { 
            this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        }
        requestAnimationFrame(() => {
            this.draw();
        })
        this.drawCounter++;
    };
}