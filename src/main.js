/*
Yash Malegaonkar
Rocket Patrol V: Lasers that dont do anything
I think the mods that were already on the tier list took maybe 10 hours of work but the lasers took so long and 
I never even got them working like I dont get the phsyicsics system whatsoever bc I have collide on
for both the rocket and laser and im so confused 

I did:
    Create 4 new explosion sound effects and randomize which one plays on impact (3)
        for this I recorded myself in voice memos, then loaded them into an array, then used Math Library
        to randomly choose one when it crashes. 
    Display the time remaining (in seconds) on the screen (3):
        for this I got the time from the game settings and put it in seconds instead of milliseconds
        then added it to the screen, then used a callback function that is from Phaser.Clock 
        and basically just subtracted 1 every time the function is called and then used the same
        end condition
    Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
        I copied the shipclass and just updated the shipspeed, and then made it smaller and green in photoshop
        and then just passed in more points
    Implement a new timing/scoring mechanism that adds time to the clock for successful hits (5)
        because I already had the time in seconds defined, I just added time everytime a ship was hit
        and then hitting the faster ship would give you more time
    Implement mouse control for player movement and mouse click to fire (5)
        


      

*/

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

