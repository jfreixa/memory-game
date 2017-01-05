import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background.js'

export default class extends Phaser.State {
  init () {
    this.startGame = this.startGame.bind(this)
  }

  create () {
    this.game.background = new Background({
      game: this.game,
      asset: undefined,
      velocityX: 0
    })

    let titleGame = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'CRACK ALIEN CODE', this.game.customStyle)

    let buttonMusic = this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY, 'soundicons', this.startGame, null, null, 0)

    let buttonMute = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY, 'soundicons', this.startGame, null, null, 1)
    buttonMute.isMute = true

    centerGameObjects([titleGame, buttonMusic, buttonMute])
  }

  startGame ({ isMute }) {
    let playSound = isMute !== true
    this.game.state.start('Game', true, false, playSound)
  }
}
