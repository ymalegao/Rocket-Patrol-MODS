
class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('rocket', './Assets/rocket.png')
        this.load.image('spaceship', './Assets/spaceship.png')
        this.load.image('starfield', './Assets/starfield.png')
        this.load.spritesheet('explosion', './Assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image('lazer', './Assets/lazer.png')
        this.load.image('fastspaceship', './Assets/fasterspaceship.png')

    }
    
    
    create(){
        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2,0x00FF00).setOrigin(0,0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height-borderUISize-borderPadding, 'rocket').setOrigin(0,0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,'spaceship', 0,30, 'lazer', this.p1Rocket).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 'lazer',this.p1Rocket).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 'lazer',this.p1Rocket).setOrigin(0,0);
        this.ship04 = new Fastspaceship(this, game.config.width, borderUISize*2 + borderPadding*5, 'fastspaceship', 0, 40, 'lazer',this.p1Rocket).setOrigin(0,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
          this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
          this.gameOver = false;

          scoreConfig.fixedWidth = 0;
          
          
          // this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
          //   this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          //   this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
          //   this.gameOver = true;

          // }, null, this);
          this.remainingTime = game.settings.gameTimer/1000;
          console.log(this.remainingTime);

          this.timeDisplay = this.add.text(borderUISize+borderPadding*30, borderPadding+borderUISize+3, 'Time: ' + this.remainingTime, scoreConfig);

          this.time.addEvent({
            delay: 1000, 
            callback: () => {
                if (this.remainingTime > 0) {
                    this.remainingTime-=1;
                    this.timeDisplay.text = 'Time: ' + this.remainingTime;
                } else {
                    this.gameOver = true;
                    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
                }
            },
            loop: true
        });
        this.input.setDefaultCursor('pointer');
        this.input.on('pointermove', (pointer) => {
          if (!this.p1Rocket.isFiring){
            this.p1Rocket.x = pointer.x;
          }
          
          
        });





         
          
          
          

    }

    update(){
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            
            this.scene.start("menuScene");
        }
        if (!this.gameOver) {
            this.starfield.tilePositionX -= 3;
            this.p1Rocket.update();
            this.ship01.update(); 
            this.ship02.update(); 
            this.ship03.update();
            this.ship04.update();
        }
        if(this.checktoCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03);   
            this.remainingTime+=1;

            this.ship03.reset();
            console.log('kaboom ship 03');
          }
        if (this.checktoCollision(this.p1Rocket, this.ship02)) {
            this.shipExplode(this.ship02);
            this.ship02.reset();
            this.p1Rocket.reset();
            this.remainingTime+=1;

            console.log('kaboom ship 02');
          }
        if (this.checktoCollision(this.p1Rocket, this.ship01)) {
            this.ship01.reset();
            this.shipExplode(this.ship01);  
            this.p1Rocket.reset();
            this.remainingTime+=1;

            console.log('kaboom ship 01');
          }

          if (this.checktoCollision(this.p1Rocket, this.ship04)) {
            this.ship04.reset();
            this.shipExplode(this.ship04);  
            this.p1Rocket.reset();
            this.remainingTime+=5;

            console.log('kaboom ship 04');
          }
          if (this.remainingTime !== undefined) {
            this.timeDisplay.text = 'Time: ' + this.remainingTime;
          }

        


          

        
      
     
        
       
          

    }

    checktoCollision(rocket, ship){
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y>ship.y){
            return true;
        }else{
            return false
        }
    }

   

    // checkOverlap(rocket, laser){
    //   let bound1 = rocket.getBounds();
      

    //   let bound2 = laser.getBounds();
    //   console.log(bound1, bound2.x)
    //   console.log(Phaser.Geom.Intersects.RectangleToRectangle(bound1, bound2));
    //   return Phaser.Geom.Intersects.RectangleToRectangle(bound1, bound2);
    // }
      
    
      
      
  

    

    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        let soundarr = ['crash1', 'crash2', 'crash3', 'crash4', 'sfx_explosion']
        let r = Math.floor(Math.random() * 5);
        console.log(r);
        boom.anims.play('explode');             
        boom.on('animationcomplete', () => {    
          ship.reset();                         
          ship.alpha = 1;                      
          boom.destroy();                       
        });
        this.p1Score+=ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play(soundarr[r]);
      }

      
      

}
    


