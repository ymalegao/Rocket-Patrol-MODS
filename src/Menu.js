class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    
    
    
    
    
    preload(){
        this.load.audio('sfx_select', './Assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './Assets/explosion38.wav');
        this.load.audio('sfx_rocket', './Assets/rocket_shot.wav');
        this.load.audio('crash1', './Assets/crash1.m4a');
        this.load.audio('crash2', './Assets/crash2.m4a');
        this.load.audio('crash3', './Assets/crash3.m4a');
        this.load.audio('crash4', './Assets/crash4.m4a');

    }
    
    
    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2-borderUISize-borderPadding, "ROCKET PATROL", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Use <--> arrows to move and & F to fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color  = "#000";
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, "Pres <- for Novice or -> for Expert", menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
            spaceshipSpeed: 3,
            fastshipspeed : 5, 
            gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
            spaceshipSpeed: 4,
            fastshipspeed : 6, 
            gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
        }
}


