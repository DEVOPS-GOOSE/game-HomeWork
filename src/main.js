import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import MainMenu from './scenes/MainMenu';
import EndMenu from './scenes/EndMenu';


const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 384,
    height: 216,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        
        MainMenu,
        GameScene,
        EndMenu,
        
    ],
    
    
};

const game = new Phaser.Game(config);

//var player