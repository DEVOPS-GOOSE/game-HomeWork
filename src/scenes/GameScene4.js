import Phaser, { Scene } from "phaser";

let background;
let platforms;
let player;
let plat_move;
let plat_vertical;
let plat_right;

let lava;

let keyW;
let keyA;
let keyS;
let keyD;
let keySpace;

let event;


class GameScene4 extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene4",
        });
    }

    preload() {
        // code here
        this.load.image("bg", "src/img/tiles/bg.png");
        this.load.image("ground", "src/img/tiles/platform.jpeg");
        this.load.image("ground2", "src/img/tiles/platform.jpeg")
        this.load.image(
            "platform_vertical",
            "src/img/tiles/platform_dark_vertical.jpeg"
        );
        this.load.image("platform", "src/img/tiles/platform_dark.jpeg");
        this.load.image("lava", "src/img/tiles/lava.png");
        this.load.spritesheet("playerIdle", "src/img/sprites/player/idle.png", {
            frameWidth: 192,
            frameHeight: 192,
        });
        this.load.spritesheet("playerRun", "src/img/sprites/player/run.png", {
            frameWidth: 192,
            frameHeight: 192,
        });    

        this.load.image('bro1Icon', 'src/img/sprites/bro1/bro1Icon.png')
        this.load.image('bro2Icon', 'src/img/sprites/bro2/bro2Icon.png')

        this.load.image('smallrock1','src/img/tiles/Cave - SmallRocks.png');
        this.load.image('smallrock2','src/img/tiles/Cave - SmallRocks2.png');
        this.load.image('smallrock3','src/img/tiles/Cave - SmallRocks3.png');
    }
    create() {
        background = this.add.image(192, 108, "bg");

        platforms = this.physics.add.staticGroup();
        platforms.enableBody = true;
        //=======Ground=======
        let ground = platforms.create(
            this.sys.game.canvas.width / 11.2,
            this.sys.game.canvas.height - 14,
            "ground"
        );
       
        ground.setScale(0.5, 5);
        ground.setImmovable();
        ground.refreshBody();

        //=======Ground2=======
        let ground2 = platforms.create(
            270, 
            this.sys.game.canvas.height - 14,
            "ground2"
        );

        ground2.setScale(1.85, 5);
        ground2.setImmovable();
        ground2.refreshBody();

        //========Platforms======
         plat_vertical = platforms.create(this.sys.game.canvas.width/6, 132,'platform_vertical')
         plat_vertical.setScale(0.7,0.5).refreshBody()


        platforms.create(45,151,'platform').setScale(0.2,0.5).refreshBody()
        platforms.create(15,116,'platform').setScale(0.2,0.5).refreshBody()
        // platforms.create(21,81,'platform').setScale(0.3,0.5).refreshBody()
        // platforms.create(81,46,'platform').setScale(0.3,0.5).refreshBody()

        plat_move = this.physics.add.image(130,81,'platform').setScale(0.2,0.5) //(130,81)
        plat_move.setImmovable();
        plat_move.setCollideWorldBounds(true);

        
        //plat_right = platforms.create(365,132,'platform').setScale(0.25,8).refreshBody()


        //============Lava==============
        lava = this.physics.add.image(104, 208, "lava");
        lava.setScale(0.09, 0.2);

        //=====Player======
        player = this.physics.add
            .sprite(53, 150, "playerIdle")
            .setSize(9, 14)
            .setOffset(92, 98);
        player.setCollideWorldBounds(true);
        player.setGravityY(500);

        //========= Bro icon==========
          this.add.image(320,20,'bro1Icon').setScale(0.8);
          this.add.image(340,20,'bro2Icon').setScale(0.8);
        //========Collider==========
        this.physics.add.collider(player, platforms)
        this.physics.add.collider(player, plat_move)
        this.physics.add.collider(plat_move, plat_right)
        this.physics.add.collider(plat_move, plat_vertical)

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
    }
}
export default GameScene4;