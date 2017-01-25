import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, scored, plusTime, soundActivated }) {
    super(game, x, y, asset)

    this.placeTiles = this.placeTiles.bind(this)
    this.calculateSpace = this.calculateSpace.bind(this)
    this.showTile = this.showTile.bind(this)
    this.checkTiles = this.checkTiles.bind(this)
    this.playSound = this.playSound.bind(this)

    this.game = game
    this.scored = scored
    this.plusTime = plusTime
    this.soundActivated = soundActivated

    this.tileSize = 80
    this.numRows = 4
    this.numCols = 5
    this.tileSpacing = 10
    this.tilesArray = []
    this.selectedArray = []
    this.tilesLeft = this.numRows * this.numCols

    this.sounds = {
      select: this.game.add.audio('select'),
      right: this.game.add.audio('right'),
      wrong: this.game.add.audio('wrong')
    }

    this.placeTiles()
  }

  placeTiles () {
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
        let tile = this.game.add.button(leftSpace + i * tileSpace, topSpace + j * tileSpace, 'tiles', this.showTile, null, null, 10)
        tile.value = this.tilesArray[j * this.numCols + i]
      }
    }
  }

  calculateSpace (allowedSpace, numberTiles) {
    return (allowedSpace - (numberTiles * this.tileSize) - ((numberTiles - 1) * this.tileSpacing)) / 2
  }

  showTile (target) {
    if (this.selectedArray.length < 2 && this.selectedArray.indexOf(target) === -1) {
      this.playSound(this.sounds.select)
      target.frame = target.value
      this.selectedArray.push(target)
      if (this.selectedArray.length === 2) {
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.checkTiles, this)
      }
    }
  }

  checkTiles () {
    if (this.selectedArray[0].value === this.selectedArray[1].value) {
      this.playSound(this.sounds.right)
      this.scored()
      this.plusTime()
      this.selectedArray[0].destroy()
      this.selectedArray[1].destroy()
      this.tilesLeft -= 2
      if (this.tilesLeft === 0) {
        this.tilesArray.length = 0
        this.selectedArray.length = 0
        this.placeTiles()
      }
    } else {
      this.playSound(this.sounds.wrong)
      this.selectedArray[0].frame = 10
      this.selectedArray[1].frame = 10
    }
    this.selectedArray.length = 0
  }

  playSound (sound) {
    if (this.soundActivated) {
      sound.play()
    }
  }
}
