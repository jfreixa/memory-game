import Phaser from 'phaser'

import BootState from './states/Boot'
import StartState from './states/Start'
import GameState from './states/Game'
import GameOverState from './states/GameOver'

class Game extends Phaser.Game {

  constructor () {
    let gameRatio = window.innerWidth / window.innerHeight
    let width = Math.ceil(1080 * gameRatio)
    let height = 1080

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Start', StartState, false)
    this.state.add('Game', GameState, false)
    this.state.add('GameOver', GameOverState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
