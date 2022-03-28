const Plateau = {
  size: {
    //set some defaults
    width: 10,
    height: 10
  },
  
  rover: {
    xCord: 0,
    yCord: 0,
    dir: 'N'
  },
  
  icons: {
    N: '<i class="fa-solid fa-arrow-up"></i>',
    W: '<i class="fa-solid fa-arrow-left"></i>',
    S: '<i class="fa-solid fa-arrow-down"></i>',
    E: '<i class="fa-solid fa-arrow-right"></i>',
  },
  
  setSize (width, height) {
    this.size.width = width
    this.size.height = height
  },
  
  dropRover (x, y, dir) {
    this.rover.xCord = x
    this.rover.yCord = y
    this.rover.dir = dir
    const locationDisplay = document.getElementById('rover-location')
    locationDisplay.innerText = JSON.stringify(this.getRoverLocation())
    this.printGrid()
  },
  
  sendRoverCommand() {
    let command = document.getElementById('command').value
    
    const commands = {
      L: {
        N: 'W',
        W: 'S',
        S: 'E',
        E: 'N'
      },
      R: {
        N: 'E',
        W: 'N',
        S: 'W',
        E: 'S'
      },
      M: {
        N: () => ++this.rover.yCord,
        E: () => ++this.rover.xCord,
        W: () => --this.rover.xCord,
        S: () => --this.rover.yCord
      }
    }
    
    const locationDisplay = document.getElementById('rover-location')
    
    for(let i=0; i<command.length; i++){
      setTimeout(() => {
        if(command[i] === 'L' || command[i] === 'R') {
          this.rover.dir = commands[command[i]][this.rover.dir]
          locationDisplay.innerText = JSON.stringify(this.getRoverLocation())
        }
    
        if(command[i] === 'M') {
          commands[command[i]][this.rover.dir]()
          locationDisplay.innerText = JSON.stringify(this.getRoverLocation())
        }
        this.printGrid()
      }, 500*(i+1))
    }
  },
  
  getRoverLocation () {
    return this.rover
  },
  
  printGrid(){
    let rows = [...Array(this.size.height).keys()].map(row => {
      return [...Array(this.size.width).keys()].map(col => {
        return { x: col+1, y: this.size.height - row }
      })
    })
    
    let html =  `<table class="grid">`;
  
    rows.forEach(row => {
        html += `<tr>`
        row.forEach(cell => {
          if(this.rover.xCord === cell.x && this.rover.yCord === cell.y) {
            if(this.rover.dir){}
            html += `<td class="rover">${this.icons[this.rover.dir]}</td>`
          } else {
            html += '<td>x</td>'
          }
        })
        html += `</tr>`
    })
    
    html += `</table>`
    
    document.getElementById('grid').innerHTML = html
  }
}

Plateau.setSize(10, 10)
Plateau.printGrid()
