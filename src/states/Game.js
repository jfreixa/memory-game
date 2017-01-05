import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background.js'
import Tiles from '../sprites/Tiles.js'

export default class extends Phaser.State {
  init (soundActivated) {
    this.soundActivated = soundActivated
    this.decreaseTime = this.decreaseTime.bind(this)
    this.scored = this.scored.bind(this)
    this.plusTime = this.plusTime.bind(this)
  }

  create () {
    this.game.score = 0
    this.game.timeLeft = 60

    this.game.background = new Background({
      game: this.game,
      asset: undefined,
      velocityX: 0
    })

    this.game.tiles = new Tiles({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'tiles',
      scored: this.scored,
      plusTime: this.plusTime,
      soundActivated: this.soundActivated
    })

    this.game.scoreText = this.game.add.text(this.game.world.centerX, this.game.height - 100, `Score: ${this.game.score}`, this.game.customStyle)
    this.game.timeText = this.game.add.text(this.game.world.centerX, this.game.height - 50, `Time left: ${this.game.timeLeft}`, this.game.customStyle)
    centerGameObjects([this.game.scoreText, this.game.timeText])

    this.game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime)
  }

  scored () {
    this.game.score++
    this.game.scoreText.text = `Score: ${this.game.score}`
  }

  plusTime () {
    this.game.timeLeft += 2
    this.game.timeText.text = `Time left: ${this.game.timeLeft}`
  }

  decreaseTime () {
    this.game.timeLeft--
    this.game.timeText.text = `Time left: ${this.game.timeLeft}`
    if (this.game.timeLeft === 0) {
      this.game.state.start('GameOver', true, false, this.game.score)
    }
  }
}
