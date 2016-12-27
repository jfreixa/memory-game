/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init (soundActivated) {
    this.soundActivated = soundActivated
  }
  preload () { }

  create () {
    this.game.stage.disableVisibilityChange = true
    this.tileSize = 80
    this.numRows = 4
    this.numCols = 5
    this.tileSpacing = 10
    this.tilesArray = []
    this.selectedArray = []
    this.soundArray = []
    this.score = 0
    this.timeLeft = 60
    this.placeTiles()
    this.soundArray[0] = this.game.add.audio('select', 1)
    this.soundArray[1] = this.game.add.audio('right', 1)
    this.soundArray[2] = this.game.add.audio('wrong', 1)
    var style = {
      font: '32px Monospace',
      fill: '#00ff00',
      align: 'center'
    }
    this.scoreText = this.game.add.text(5, 5, `Score: ${this.score}`, style)
    this.timeText = this.game.add.text(5, this.game.height - 5, `Time left: ${this.timeLeft}`, style)
    this.timeText.anchor.set(0, 1)
    this.game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this)
  }
  placeTiles () {
    this.tilesLeft = this.numRows * this.numCols
    let leftSpace = this.calculateSpace(this.game.width, this.numCols)
    let topSpace = this.calculateSpace(this.game.height, this.numRows)
    let tileSpace = this.tileSize + this.tileSpacing
    for (let i = 0; i < this.numRows * this.numCols; i++) {
      this.tilesArray.push(Math.floor(i / 2))
    }
    for (let i = 0; i < this.numRows * this.numCols; i++) {
      let from = this.game.rnd.between(0, this.tilesArray.length - 1)
      let to = this.game.rnd.between(0, this.tilesArray.length - 1)
      let temp = this.tilesArray[from]
      this.tilesArray[from] = this.tilesArray[to]
      this.tilesArray[to] = temp
    }
    for (let i = 0; i < this.numCols; i++) {
      for (let j = 0; j < this.numRows; j++) {
        let tile = this.game.add.button(leftSpace + i * tileSpace, topSpace + j * tileSpace, 'tiles', this.showTile, this)
        tile.frame = 10
        tile.value = this.tilesArray[j * this.numCols + i]
      }
    }
  }

  showTile (target) {
    if (this.selectedArray.length < 2 && this.selectedArray.indexOf(target) === -1) {
      this.playSound(0)
      target.frame = target.value
      this.selectedArray.push(target)
      if (this.selectedArray.length === 2) {
        this.game.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this)
      }
    }
  }

  checkTiles () {
    if (this.selectedArray[0].value === this.selectedArray[1].value) {
      this.playSound(1)
      this.scored()
      this.timeLeft += 2
      this.timeText.text = `Time left: ${this.timeLeft}`
      this.selectedArray[0].destroy()
      this.selectedArray[1].destroy()
      this.tilesLeft -= 2
      if (this.tilesLeft === 0) {
        this.tilesArray.length = 0
        this.selectedArray.length = 0
        this.placeTiles()
      }
    } else {
      this.playSound(2)
      this.selectedArray[0].frame = 10
      this.selectedArray[1].frame = 10
    }
    this.selectedArray.length = 0
  }

  calculateSpace (allowedSpace, numberTiles) {
    return (allowedSpace - (numberTiles * this.tileSize) - ((numberTiles - 1) * this.tileSpacing)) / 2
  }

  playSound (numberSound) {
    if (this.soundActivated) {
      this.soundArray[numberSound].play()
    }
  }

  scored () {
    this.score++
    this.scoreText.text = `Score: ${this.score}`
  }

  decreaseTime () {
    this.timeLeft--
    this.timeText.text = `Time left: ${this.timeLeft}`
    if (this.timeLeft === 0) {
      this.game.state.start('GameOver', true, false, this.score)
    }
  }

  render () {
    if (__DEV__) {
    }
  }
}
