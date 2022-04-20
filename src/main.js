/* 

Vincent Kaufman - Ice Cream Patrol - 4/20/2022 - 15 hours

Implement the speed increase that happens after 30 seconds in the original game (5)
Allow the player to control the Rocket after it's fired (5)
Display the time remaining (in seconds) on the screen (10)
Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)

Sound Credits:
“Sound effects obtained from https://www.zapsplat.com“
Cartoon bubble, watery movement 2
Cartoon bubble popping, or other pop 5
Designed ice cream van musical tune, chime. Version 2

*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Gameover ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;