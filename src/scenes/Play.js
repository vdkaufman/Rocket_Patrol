class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        // load images/title sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 128, frameHeight: 64, startFrame: 0, endFrame: 9});
    }
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // blue UI top background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x7393B3).setOrigin(0, 0);
        // blue UI bottom background
        this.add.rectangle(0, borderUISize + borderPadding + 350, game.config.width, borderUISize * 2, 0x7393B3).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 39, 'rocket').setOrigin(0.5, 0);
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width - 110, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width - 200, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width - 290, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        // initialize time
        this.p1Time = game.settings.gameTimer/1000;
        this.clockTime = 0;
        // initialize order speed
        this.orderSpeed = 1;
        // display score
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
            fixedWidth: 60
        }

        let dollarConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFBEFA',
            color: '#313131',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 20
        }

        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFBEFA',
            color: '#313131',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 60
        }

        this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, '$ ', dollarConfig);
        this.scoreLeft = this.add.text(borderUISize + borderPadding + 15, borderUISize + borderPadding*2,
             this.p1Score, scoreConfig);
        this.timeLeft = this.add.text(borderUISize + borderPadding + 280, borderUISize + borderPadding*2,
                this.p1Time, timeConfig);    
        this.add.text(game.config.width/2 - 190, game.config.height/2 - borderUISize - 
        borderPadding - 132, ' Ice Cream Patrol ', 100);
       
        // GAME OVER flag
        this.gameOver = false;

        // TIME CLock flag
        this.timeClock = false;
       
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            // this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            // this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            // this.gameOver = true;
        }, null, this);

        // 30-second play clock
        scoreConfig.fixedWidth = 0;
        this.clockB = this.time.delayedCall(30000, () => {
            this.timeClock = true;
            if(this.timeClock = true){
                //this.add.text(game.config.width/2 + 180, game.config.height/2 - 165, 'Its Getting Busy!', 100).setOrigin(0.5);
                this.add.text(game.config.width/2 + 165, game.config.height/2 - 168, 'Its getting busy!', 100).setOrigin(0.5);
                this.ship01.moveSpeed = this.ship01.moveSpeed*2;
                this.ship02.moveSpeed = this.ship02.moveSpeed*2;
                this.ship03.moveSpeed = this.ship03.moveSpeed*2;
                this.orderSpeed = 4;
            }
        }, null, this);
    }
    update(){
        // timer
        this.clockTime += 1;
        if(this.clockTime >= 60){
            if(this.p1Time >= 1){
            this.p1Time -= 1;
            }
            this.clockTime = 0;
        }
           if(this.p1Time < 1){
                this.gameOver = true;
                this.scene.start('gameOverScene');    
            }

        this.timeLeft.text = this.p1Time;

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("playScene");
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= this.orderSpeed;  // update tile sprite
      
        if (!this.gameOver) {
        this.p1Rocket.update();             // update rocket sprite
        this.ship01.update();               // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
        }   
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);
        }
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width - 50 && 
            rocket.x + rocket.width - 80 > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });     
        // score add and repaint
        this.p1Score += 5;
        this.p1Time += 1;
        this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_explosion');
      }

}