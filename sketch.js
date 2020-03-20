const reButton = document.getElementById('reButton');
const stButton = document.getElementById('stButton');
const clButton = document.getElementById('clButton');
let myCanvas;

let blockWidth = 10;
var grid;
let cols = 40;
let rows = 40;
let go = false;

//grid function
//create empty cols*row 2D array
function make2DArray(_cols, _rows) {
  arr = new Array(_cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(_rows);
  }
  return arr;
}


//set canvas size + assign grid val
function setup() {
  myCanvas = select('#myCanvas');
  let x = blockWidth * cols + 1;
  let y = blockWidth * rows + 1;
 createCanvas(x, y);
 let canvas = select('canvas');
 myCanvas.child(canvas);
  frameRate(10);
  //create grid
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
  // noLoop();
}
// let sum = 0

function draw() {

  //draw grid  from array
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * blockWidth;
      let y = j * blockWidth;
      if (grid[i][j] == 1) {
        fill(0);
        rect(x, y, blockWidth, blockWidth);
      } else {
        fill(255);
        rect(x, y, blockWidth, blockWidth);
      }

    }
  }

  if (go == true) {
    let next = make2DArray(cols, rows);
    //compute next based on grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        //count live neighbers
        let sum = 0
        //count Neughbors
        for (let u = -1; u <= 1; u++) {
          for (let v = -1; v <= 1; v++) {
            if (u != 0 || v != 0) {
              sum += grid[(i + u + cols) % cols][(j + v + rows) % rows];
            }
          }
        }
        //run logic
        // if dead
        if (grid[i][j] == 0) {
          //rebirth
          if (sum == 3) {
            next[i][j] = 1
            //stay
          } else {
            next[i][j] = grid[i][j]
          }
          //if life
        } else {
          //death
          if (sum < 2 || sum > 3) {
            next[i][j] = 0
            //stay
          } else {
            next[i][j] = grid[i][j]
          }
        }
        // console.log(next[i][j]);
      }
    }
    grid = next.slice();
  }

}

function mousePressed() {
  changeLife();
}

function changeLife() {
  if (mouseX < width && mouseY < height){
  let x = floor(mouseX / blockWidth);
  let y = floor(mouseY / blockWidth);
  grid[x][y] = (grid[x][y]+1)%2
  }
}

reButton.addEventListener("click", valReset);
stButton.addEventListener("click", st);
clButton.addEventListener("click", cl);

function valReset() {
  let empt = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      empt[i][j] = floor(random(2));
    }
  }
  grid = empt.slice();
}

function st() {

  if (go == true) {
    go = false
    stButton.value = "Start"
  } else if (go == false) {
    go = true
    stButton.value = "Stop"
  }
}

function cl(){
  let empt = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      empt[i][j] = 0;
    }
  }
  grid = empt.slice();
}
