let config = {
    type: Phaser.CANVAS,
    width:640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play]
}
//add pshycis system

let game = new Phaser.Game(config);

let borderUISize  = game.config.height/15;
let borderPadding = borderUISize/3;

let keyF, keyR, keyLEFT, keyRIGHT;

