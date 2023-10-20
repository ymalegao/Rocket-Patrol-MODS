class Laser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'lazer'); 
        scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        this.body.onCollide = true;
        this.body.velocity.y = 400; 
    }

    update(){
        if (this.y < 0 ) {
            this.destroy();
        }
    }


}

