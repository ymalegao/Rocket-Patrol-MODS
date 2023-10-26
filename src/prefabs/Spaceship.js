
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texure, frame, pointValue, lasertexure, rocketship){
        super(scene, x ,y, texure, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.ltexure = lasertexure
        this.rship = rocketship;

        
    }


    update(){
        this.x-=this.moveSpeed;
        if (this.x<= 0 - this.width){
            this.x = game.config.width;
        }
        if (Phaser.Math.Between(1, 100) === 1) {
                this.fireLaser(this.ltexure, this.rship);
            }
    }

        
    

    reset(){
        this.x=game.config.width;
    }
    
    fireLaser(ltexure, rship) {
            // Create a new laser instance and add it to the scene
            const laser = new Laser(this.scene, this.x, this.y, ltexure, rship);
        }
    




    
       
    
}

