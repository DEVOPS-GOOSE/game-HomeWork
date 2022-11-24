import Phaser, { Scene } from "phaser";

let background
let button
let player
let bro1
let bro2


class EndMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'EndMenu'
        });
    }

    preload() {
        // code here
        this.load.image('background', 'src/img/tiles/outside.png')
        this.load.image('restart_button', 'src/img/sprites/restart_button.png')
        this.load.spritesheet('playerIdle', 'src/img/sprites/player/idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('bro1', 'src/img/sprites/bro1Idle.png', {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet('bro2', 'src/img/sprites/bro2Idle.png', {frameWidth: 192, frameHeight: 192});
    }
    create() {
        background = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2,'background').setScale(0.2,0.2)
        button = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/3 + 20,'restart_button').setScale(0.3,0.3)
        button.setInteractive();
        button.on("pointerdown",()=>{
            this.scene.start("GameScene")
        })

        //=========== Characters==========
        player = this.add.sprite(this.sys.game.canvas.width/2,150,'playerIdle').setScale(2)//.setSize(9,14).setOffset(92,98)
        bro1 = this.add.sprite(this.sys.game.canvas.width/2 - 60,150,'bro1').setScale(2)
        bro2 = this.add.sprite(this.sys.game.canvas.width/2 + 60,150,'bro2').setScale(2)
        //============= Animation========
        this.anims.create({
            key: 'playerAni',
            frames: this.anims.generateFrameNumbers('playerIdle', {
                start: 0,
                end: 3
            }),
            duration: 800,
            repeat: -1
        })
        this.anims.create({
            key: 'bro1Ani',
            frames: this.anims.generateFrameNumbers('bro1', {
                start: 0,
                end: 4
            }),
            duration: 800,
            repeat: -1
        })
        this.anims.create({
            key: 'bro2Ani',
            frames: this.anims.generateFrameNumbers('bro2', {
                start: 0,
                end: 3
            }),
            duration: 800,
            repeat: -1
        })
        this.tweens.add({
            targets: button,
            y: 90,
            duration: 400,
            yoyo: true,
            repeat: -1,
            loop: true
        });
    }

    update(delta, time) {
        player.anims.play('playerAni', true);
        bro1.anims.play('bro1Ani', true);
        bro2.anims.play('bro2Ani', true);
       
    }
}
export default EndMenu;