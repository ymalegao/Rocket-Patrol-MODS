class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isFiring = false;
        scene.physics.world.enable(this);
        this.body.onCollide = true;
        
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    create(){
        this.input.on('pointerover', () =>
        {
            this.isFiring=true;
            this.sfxRocket.play();
            

        });
    }


    update(){
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;

            }else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.fire();
        }

        if (!this.isFiring && this.y <= game.config.height - borderUISize - borderPadding) {
            if (this.scene.input.activePointer.isDown) {
                this.fire();
            }
        }
       
        // move up?
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y-=this.moveSpeed;
        }

        if(this.y <= borderUISize * 3 + borderPadding){
            this.isFiring=false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
    reset(){
        
        this.isFiring = false;
        this.y = game.config.height-borderUISize-borderPadding;
    }

    fire(){
        this.isFiring=true;
        this.sfxRocket.play();
    }





}










