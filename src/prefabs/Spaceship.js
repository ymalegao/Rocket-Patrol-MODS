class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texure, frame, pointValue){
        super(scene, x ,y, texure, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
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

    fireLaser(){
        if (Phaser.Math.Between(1, 100) === 1) {
            return new Laser(this.scene, this.x, this.y);
        }
        return null;
    }
    

       
    
}

