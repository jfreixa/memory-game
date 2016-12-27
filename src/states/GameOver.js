import Phaser from 'phaser'
export default class extends Phaser.State {
  init (score) {
    this.score = score
  }

  preload () {}

  create () {
    this.localStorageName = 'jordiFreixa'
    this.highScore = localStorage.getItem(this.localStorageName) == null ? 0 : localStorage.getItem(this.localStorageName)
    this.highScore = Math.max(this.score, this.highScore)
    localStorage.setItem(this.localStorageName, this.highScore)
    let style = {
      font: '32px Monospace',
      fill: '#00ff00',
      align: 'center'
    }
    let text = this.game.add.text(
      this.game.width / 2,
      this.game.height / 2,
      `GameOver \n\nYour score: ${this.score}\nBest score: ${this.highScore}\n\nTap to restart`,
      style
    )
    text.anchor.set(0.5)
    this.game.input.onDown.add(this.restartGame, this)
  }
  restartGame () {
    this.game.state.start('Title')
  }

  render () {}
}
