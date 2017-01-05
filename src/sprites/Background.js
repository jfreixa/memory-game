import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game
    this.game.add.image(0, 0, 'background')
    let emitter = this.game.add.emitter(this.game.world.centerX, this.game.height, 2000)

    emitter.width = this.game.world.width
    emitter.makeParticles('rain')

    emitter.minParticleScale = 0.1
    emitter.maxParticleScale = 0.5

    emitter.setYSpeed(-300, -900)
    emitter.setXSpeed(-5, 5)

    emitter.start(false, 2000, 10)
  }
}
