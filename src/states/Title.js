import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
  }
  create () {
    var style = {
      font: '48px Monospace',
      fill: '#00ff00',
      align: 'center'
    }
    var text = this.game.add.text(this.game.width / 2, this.game.height / 2 - 100, 'Crack Alien Code', style)
    text.anchor.set(0.5)
    var soundButton = this.game.add.button(this.game.width / 2 - 100, this.game.height / 2 + 100, 'soundicons', this.startGame, this)
    soundButton.anchor.set(0.5)
    soundButton = this.game.add.button(this.game.width / 2 + 100, this.game.height / 2 + 100, 'soundicons', this.startGame, this)
    soundButton.frame = 1
    soundButton.anchor.set(0.5)
  }

  startGame (target) {
    let playSound = false
    if (target.frame === 0) {
      playSound = true
    }
    this.game.state.start('Game', true, false, playSound)
  }

  render () {
  }
}
