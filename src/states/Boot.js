import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Open+Sans']
      },
      active: this.fontsLoaded
    })

    this.game.customStyle = {
      font: '40px Open Sans',
      fill: '#00ff00',
      align: 'center'
    }

    this.game.load.spritesheet('tiles', './assets/sprites/tiles.png', 80, 80)
    this.game.load.spritesheet('soundicons', './assets/sprites/soundicons.png', 80, 80)
    this.game.load.spritesheet('rain', './assets/sprites/rain.png', 17, 17)

    this.game.load.image('background', './assets/sprites/bg.jpg')

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
    if (this.fontsReady) {
      this.state.start('Start')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
