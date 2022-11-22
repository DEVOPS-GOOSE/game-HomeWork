import Phaser from "phaser";

let background;
let platforms;
let player;
let plat_move;
let plat_vertical

let keyW;
let keyA;
let keyS;
let keyD;
let keySpace;

let event1

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        // code here
        this.load.image('bg','src/img/tiles/bg.png');
        this.load.image('ground', 'src/img/tiles/platform.jpeg');
        this.load.image('platform_vertical', 'src/img/tiles/platform_dark_vertical.jpeg')
        this.load.image('platform', 'src/img/tiles/platform_dark.jpeg')
        this.load.spritesheet('playerIdle', 'src/img/sprites/player/idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('playerRun', 'src/img/sprites/player/run.png', {frameWidth: 192, frameHeight: 192});
        //this.load.spritesheet('playerJump', 'src/img/sprites/player/jump.png', {frameWidth: 192, frameHeight: 192});

    }

    create() {
        background = this.add.image(192,108,'bg');

        platforms = this.physics.add.staticGroup()
        platforms.enableBody = true
        //=======Ground=======
        let ground = platforms.create(this.sys.game.canvas.width/2,this.sys.game.canvas.height-14, 'ground')
        ground.setScale(3,2);
        ground.setImmovable();
        ground.refreshBody();
        //========Platforms======
        plat_vertical = platforms.create(this.sys.game.canvas.width/3.5, 117, 'platform_vertical')
        platforms.create(21,151,'platform').setScale(0.3,0.5).refreshBody()
        platforms.create(81,116,'platform').setScale(0.3,0.5).refreshBody()
        platforms.create(21,81,'platform').setScale(0.3,0.5).refreshBody()
        platforms.create(81,46,'platform').setScale(0.3,0.5).refreshBody()
        plat_move =  this.physics.add.image(131,81,'platform').setScale(0.2,0.5)
        //.refreshBody()
      //  plat1.setScale(1,0.5).setAngle(90)
       // plat1.refreshBody();


        //=====Player======
        player = this.physics.add.sprite(100,100,'playerIdle').setSize(12,14).setOffset(90,98)
     //   player.refreshBody()
        player.setCollideWorldBounds(true)
        player.setGravityY(500);

        //========Colider==========
        this.physics.add.collider(player, platforms)

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
        // this.anims.create({
        //     key: 'jumpAni',
        //     frames: this.anims.generateFrameNumbers('playerJump', {
        //         start: 0,
        //         end: 8
        //     }),
        //     duration: 800,
        //     repeat: -1
        // })

    


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
        // else if (keyW.isDown){
        //     finn.setVelocityY(-200)
        // }
        else {
            player.setVelocityX(0);
            player.anims.play('idleAni', true);
        }
        if (keyW.isDown && player.body.touching.down){
            player.setVelocityY(-200);
        }


    }
}
export default GameScene;
