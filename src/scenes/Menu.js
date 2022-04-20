class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/zapsplat_musical_ice_cream_van_musical_chime_002_43590.mp3');
        this.load.audio('sfx_explosion', './assets/zapsplat_cartoon_bubble_pop_005_40277.mp3');
        this.load.audio('sfx_rocket', './assets/zapsplat_cartoon_bubble_002_46660.mp3');
      }
      
    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFBEFA',
            color: '#313131',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 
        borderPadding, ' Ice Cream Patrol ', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#ACD5FD';
        menuConfig.color = '#313131';
        this.add.text(game.config.width/2, game.config.height/2, ' Use ←→ arrows to move ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + 
        borderPadding, ' Use (F) to throw ice cream ', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFBEFA';
        menuConfig.color = '#313131';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + 
        borderPadding + 45, ' Press ← for Novice or → for Expert ', menuConfig).setOrigin(0.5);
    
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000     
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 5,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}