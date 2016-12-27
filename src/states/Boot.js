import Phaser from 'phaser'
export default class extends Phaser.State {
  init () {

  }

  preload () {
    this.game.load.spritesheet('tiles', './assets/sprites/tiles.png', 80, 80)
    this.game.load.spritesheet('soundicons', './assets/sprites/soundicons.png', 80, 80)
    this.game.load.audio('select', ['./assets/sounds/select.mp3', './assets/sounds/select.ogg'])
    this.game.load.audio('right', ['./assets/sounds/right.mp3', './assets/sounds/right.ogg'])
    this.game.load.audio('wrong', ['./assets/sounds/wrong.mp3', './assets/sounds/wrong.ogg'])
  }
  create () {
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  render () {
    this.state.start('Title')
  }
}
