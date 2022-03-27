console.log('start')

const plateau = {
  rover: {
    xCord: 0,
    yCord: 0,
    dir: 'N'
  },

  dropRover(x,y, dir) {
    this.rover.xCord = x
    this.rover.yCord = y
    this.rover.dir = dir
  },

  getRoverLocation() {
    console.log(JSON.stringify(this.rover))
  }

}

plateau.dropRover(1,2,'N')

plateau.getRoverLocation()