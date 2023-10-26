class Laser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texure, p1rocket) {
        super(scene, x, y, texure); 
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.onCollide = true;
        this.body.velocity.y = 400; 
        this.playerRocket = p1rocket;

        
    }
   

    update(){
        if (this.y < 0 ) {
            this.destroy();

        }

        
    }

   

}


this.physics.add.overlap(this, playerRocket, collide, null, this);


function collide(laser, playerRocket){
    console.log("helo");
}


