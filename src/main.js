import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import MainMenu from './scenes/MainMenu';
<<<<<<< Updated upstream

=======
import EndMenu from './scenes/EndMenu';
import Tutorial from './scenes/Tutorial';
import GameScene4 from './scenes/GameScene4';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        MainMenu,
        GameScene
=======
        GameScene4,
        MainMenu,
        Tutorial,
        GameScene,
        EndMenu,
        
        
>>>>>>> Stashed changes
    ],
    
    
};

const game = new Phaser.Game(config);