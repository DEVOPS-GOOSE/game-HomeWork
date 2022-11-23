import Phaser from "phaser";

let background;
let platforms;
let player;
let plat_move;
let plat_vertical
let plat_right;
//let platformHit

let lava;

let keyW;
let keyA;
let keyS;
let keyD;
let keySpace;

let event
let x = 1

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
        this.load.image('lava', 'src/img/tiles/lava.png')
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

        plat_move = this.physics.add.image(130,81,'platform').setScale(0.2,0.5)
        plat_move.setImmovable();
        plat_move.setCollideWorldBounds(true);
       // plat_move.setVelocityX(100);
        
        plat_right = platforms.create(365,132,'platform').setScale(0.25,8).refreshBody()

        //============Lava==============
        lava = this.physics.add.image(231,180,'lava')
        lava.setScale(0.305,0.1)
        

        //.refreshBody()
      //  plat1.setScale(1,0.5).setAngle(90)
       // plat1.refreshBody();


        //=====Player======
        player = this.physics.add.sprite(100,100,'playerIdle').setSize(9,14).setOffset(92,98)
     //   player.refreshBody()
        player.setCollideWorldBounds(true)
        player.setGravityY(500);

        //========Colider==========
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(player, plat_move)
        this.physics.add.collider(plat_move, plat_right)
        this.physics.add.collider(plat_move, plat_vertical)

        this.physics.add.overlap(player, lava)

      //  plat_move.setBounce(1,0)
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

        // this.physics.add.collider(plat_move, plat_right, function () {
        //     platformHit= true;
        //   });
        // this.physics.add.collider(plat_move, plat_vertical, function () {
        //     platformHit= true;
        //   });

        event = this.time.addEvent({
          //  delay: 500,
            callback: function(){
                
                this.physics.add.collider(plat_move, plat_right, function () {
                        //platformHit= true;
                        plat_move.setVelocityX(-100)
                });
                this.physics.add.collider(plat_move, plat_vertical, function () {
                    //platformHit= true;
                    plat_move.setVelocityX(100)
            });
                // if (plat_move.x == 313){
                //     plat_move.setVelocityX(-100)
                // }
                
        //         bullet.setScale(0.25)
        //   //      bullet.setVelocityY(-200)
        //         bullet.setDepth(0.9)
        //         bulletGroup.add(bullet)
        //         bulletGroup.setVelocityY(-400)

            },
            callbackScope: this,
            loop: true
        })

        //=========Input=============
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR)
    }

    update(delta, time) {
        
        
        // if (this.physics.add.collider(plat_move, plat_right)){
        //     x = -1
        // }
        // if (this.physics.add.collider(plat_move, plat_vertical)){
        //     x = 1
        // }
        // plat_move.x += 5 * x;
       

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
     //  plat_move.setVelocityX(100);


    }
}
export default GameScene;
