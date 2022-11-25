import Phaser, { Scene } from "phaser";

let background;
let platforms;
let player;
let plat_move;
let plat_vertical
let plat_right;
let ground;
let ground_right;
let brother;



let lava;

let keyW;
let keyA;
let keyS;
let keyD;
let keySpace;

let event
let x = 1

class GameScene2 extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene2'
        });
    }

    preload() {
        // code here
        this.load.image('bg','src/img/tiles/bg.png');
        this.load.image('ground', 'src/img/tiles/platform.jpeg');
        this.load.image('platform_vertical', 'src/img/tiles/platform_dark_vertical.jpeg')
        this.load.image('platform', 'src/img/tiles/platform_dark.jpeg')
        this.load.image('lava', 'src/img/tiles/lava.png')
        this.load.image('portal', 'src/img/tiles/portal.png')
        this.load.spritesheet('playerIdle', 'src/img/sprites/player/idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('playerRun', 'src/img/sprites/player/run.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('broIdle', 'src/img/sprites/player/bro1Idle.png', {frameWidth: 192, frameHeight: 192});

    }

    create() {
        background = this.add.image(192,108,'bg');

        platforms = this.physics.add.staticGroup()
        platforms.enableBody = true
        //=======Ground=======
        ground = platforms.create(this.sys.game.canvas.width/50,this.sys.game.canvas.height-18, 'platform').setCollideWorldBounds(true)
        ground.setScale(1,5);
        ground.setImmovable();
        ground.refreshBody();
        ground.setDepth(2);
        
        ground_right = platforms.create(207,this.sys.game.canvas.height-18,'platform').setScale(0.5,5).refreshBody().setCollideWorldBounds(true).setDepth(2)
        //========Platforms======
        plat_vertical = platforms.create(this.sys.game.canvas.width/1.61, 107,'platform_vertical')
        plat_vertical.setScale(0.5,0.8).refreshBody()
        plat_vertical = platforms.create(this.sys.game.canvas.width/2.19, 60,'platform_vertical')
        plat_vertical.setScale(0.5,1.2).refreshBody()

        platforms.create(193,131,'platform').setScale(0.2,0.2).refreshBody()
        platforms.create(221,101,'platform').setScale(0.2,0.2).refreshBody()
        platforms.create(193,71,'platform').setScale(0.2,0.2).refreshBody()
        platforms.create(221,49,'platform').setScale(0.3,0.2).refreshBody()
        platforms.create(295,101,'platform').setScale(0.2,0.2).refreshBody()

        plat_move = this.physics.add.image(92,170,'platform').setScale(0.2,0.5)
        plat_move.setImmovable();
        plat_move.setCollideWorldBounds(true);

        plat_right = platforms.create(365,200,'platform').setScale(0.37,18).refreshBody()

        //=========Portal===========
        let portal = this.physics.add.image(368,46,'portal').setScale(0.1); //360,30
        portal.setSize(270,530)//.refreshBody();
        portal.setOffset(320,70);

        //============Lava==============
        lava = this.physics.add.image(151,210,'lava')
        lava.setScale(0.5,0.1).setDepth(1)

        //=====Player======
        player = this.physics.add.sprite(53,150,'playerIdle').setSize(9,14).setOffset(92,98).setDepth(1)
        player.setCollideWorldBounds(true)
        player.setGravityY(500);

        brother = this.physics.add.sprite(295,83,'broIdle').setSize(15,26).setScale(1,1).setDepth(0).setOffset(88,85)
        brother.setCollideWorldBounds(true)

        //========Colider==========
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(player, plat_move)
        this.physics.add.collider(plat_move, ground_right)
        this.physics.add.collider(plat_move, ground)
        this.physics.add.overlap(player, portal)
        this.physics.add.overlap(player, portal, () => {
            this.scene.start("GameScene3");
        })

        this.physics.add.overlap(player, lava)
        //==========animation==========
        this.anims.create({
            key: 'idleAni',
            frames: this.anims.generateFrameNumbers('playerIdle', {
                start: 0,
                end: 3
            }),
            duration: 800,
            repeat: -1
        })
        this.anims.create({
            key: 'runAni',
            frames: this.anims.generateFrameNumbers('playerRun', {
                start: 0,
                end: 7
            }),
            duration: 800,
            repeat: -1
        })
        this.anims.create({
            key: 'idle2Ani',
            frames: this.anims.generateFrameNumbers('broIdle', {
                start: 0,
                end: 3
            }),
            duration: 800,
            repeat: -1
        })
      
        //============= Moving Platform ===============
        event = this.time.addEvent({
            callback: function(){
                
                this.physics.add.collider(plat_move, ground_right, function () {
                        plat_move.setVelocityX(-100)
                });
                this.physics.add.collider(plat_move, ground, function () {
                    plat_move.setVelocityX(100)
                });
            },
            callbackScope: this,
            loop: true
        })
        //============= Touching Lava ===============
        this.physics.add.overlap(player, lava, () => {
            this.scene.restart()

        })
        //=========Input=============
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR)
    }

    update(delta, time) {

        if(keyA.isDown){
            player.setVelocityX(-100);
            player.flipX = true;
            player.anims.play('runAni', true);
        }
        else if(keyD.isDown){
            player.setVelocityX(100);
            player.flipX = false;
            player.anims.play('runAni', true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('idleAni', true);
        }
        if (keyW.isDown && player.body.touching.down){
            player.setVelocityY(-200);
        }

        brother.anims.play('idle2Ani', true);
    }
}
export default GameScene2;
