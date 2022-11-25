import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import GameScene2 from './scenes/GameScene2';
import MainMenu from './scenes/MainMenu';
import GameScene3 from './scenes/GameScene3';
import EndMenu from './scenes/EndMenu';
import Tutorial from './scenes/Tutorial';
import GameScene4 from './scenes/GameScene4';
import GameScene5 from './scenes/GameScene5';


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
            debug: false
        }
    },
    scene: [

       
        MainMenu,
        GameScene,
        
        Tutorial,
        
        GameScene4,
        GameScene2,
        GameScene3,
        GameScene4,
        GameScene5,
        EndMenu,
        
    ],
    
    
};

const game = new Phaser.Game(config);
