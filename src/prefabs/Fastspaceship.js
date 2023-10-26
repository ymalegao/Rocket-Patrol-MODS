class Fastspaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texure, frame, pointValue){
        super(scene, x ,y, texure, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.fastshipspeed;

        
    }


    update(){
        this.x-=this.moveSpeed;
        if (this.x<= 0 - this.width){
            this.x = game.config.width;
        }

        
    
        

    }

    reset(){
        this.x=game.config.width;
    }

    
       
    
}

