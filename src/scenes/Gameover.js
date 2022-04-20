class Gameover extends Phaser.Scene {
    constructor(){
        super("gameOverScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/zapsplat_musical_ice_cream_van_musical_chime_002_43590.mp3');
        this.load.audio('sfx_explosion', './assets/zapsplat_cartoon_bubble_pop_005_40277.mp3');
        this.load.audio('sfx_rocket', './assets/zapsplat_cartoon_bubble_002_46660.mp3');
      }
    create() {
        // menu text configuration
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFBEFA',
            color: '#313131',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
 

        // show game over text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 
        borderPadding, ' Ice Cream Patrol ', scoreConfig).setOrigin(0.5);
        scoreConfig.backgroundColor = '#ACD5FD';
        scoreConfig.color = '#313131';
       this.add.text(game.config.width/2, game.config.height/2 + 10, 'GAME OVER', scoreConfig).setOrigin(0.5);
       scoreConfig.backgroundColor = '#FFBEFA';
       scoreConfig.color = '#313131';
       this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
          

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }
}