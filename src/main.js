import Phaser from 'phaser'

import BootState from './states/Boot'
import TitleState from './states/Title'
import GameState from './states/Game'
import GameOverState from './states/GameOver'

class Game extends Phaser.Game {

  constructor () {
    let width = 500
    let height = 500

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Title', TitleState, false)
    this.state.add('Game', GameState, false)
    this.state.add('GameOver', GameOverState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
