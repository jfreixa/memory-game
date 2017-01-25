import Phaser from 'phaser'
import Background from '../sprites/Background.js'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init (score) {
    this.score = score
    this.highScore = window.localStorage.getItem('bestScore') === null ? 0 : window.localStorage.getItem('bestScore')
    this.highScore = Math.max(this.score, this.highScore)
    window.localStorage.setItem('bestScore', this.highScore)

    this.restartGame = this.restartGame.bind(this)
  }

  create () {
    this.game.background = new Background({
      game: this.game,
      asset: undefined,
      velocityX: 0
    })

    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `GAME OVER\n\nSCORE: ${this.score}\nBEST: ${this.highScore}\n\nTap to restart`, this.game.customStyle)
    centerGameObjects([text])

    this.game.input.onDown.add(this.restartGame)
  }

  restartGame () {
    this.game.state.start('Start')
  }
}
