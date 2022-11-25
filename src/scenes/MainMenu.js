import Phaser, { Scene } from "phaser";

let background
let button
class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        // code here
        this.load.image('background', 'src/img/tiles/mainmenu2.png')
        this.load.image('start_button', 'src/img/sprites/start_button.png')
    }
    create() {
        background = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2,'background')
        button = this.add.image(this.sys.game.canvas.width/2,this.sys.game.canvas.height/2,'start_button').setScale(0.15,0.15)
        button.setInteractive();
        button.on("pointerdown",()=>{
            this.scene.start("GameScene3")
        })
    }

    update(delta, time) {


    }
}
export default MainMenu;
