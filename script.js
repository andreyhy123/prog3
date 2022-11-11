

// var matrix = [
// [3,3,3,3,3,3,3,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,3,0,0],
// [0,0,0,0,0,0,0,2,0,1,0,0,2,0,0,2,0,1,0,0,1,0,0,0,0],
// [0,1,0,3,0,0,3,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,3,0],
// [0,0,2,0,1,0,3,0,1,3,0,0,0,0,2,0,0,0,0,1,0,0,3,0,0],
// [0,1,2,0,1,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,3,0,1,0,2,0,2,0,0,0,0,0,2,0,0,3,3,0,0],
// [0,0,3,0,2,0,0,0,3,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
// [3,3,3,2,2,0,0,1,0,1,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,2,0,3,0,1,2,0,0,0,0,0,0,0,1,0,1,0,0,0],
// [0,0,1,1,0,0,0,0,1,0,0,1,0,2,0,0,1,0,0,3,0,0,2,0,0],
// [0,0,0,0,0,0,2,0,3,0,1,2,0,0,0,0,0,0,0,1,0,1,0,0,0],
// [0,0,0,0,0,0,2,0,3,0,1,2,0,0,0,0,0,0,0,1,0,1,0,0,0],
// [0,0,0,0,0,0,2,0,3,0,1,2,0,0,0,0,0,0,0,1,0,1,0,0,0],
// [0,0,0,0,0,0,2,0,3,0,1,2,0,0,0,0,0,0,0,1,0,1,0,0,0],
// [0,0,0,0,0,0,2,0,3,0,1,2,0,0,0,0,0,0,0,1,0,1,0,0,0],
// [0,0,0,0,0,0,2,0,3,0,1,2,0,0,0,0,0,0,0,1,0,1,0,0,0],
// [0,0,0,0,0,0,2,0,3,0,1,2,0,0,0,0,0,0,0,1,0,1,0,0,0]
// ];
console.log((Math.round(Math.random * 90)))

var matrix = [];
// matrix[i].push (Math.round(Math.random * 4));
function generator(x, y) {
    for (let i = 0; i <= x; i++) {
        matrix.push([])
        for (let j = 0; j < y; j++) {
            matrix[i].push(0);
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        matrix[(Math.round(Math.random() * 90))][(Math.round(Math.random() * 90))] = Math.round(Math.random() * 4);
    }
}
console.log(matrix)

generator(100, 100);
const side = 10;
const grassArr = [];
const grassEaterArr = [];
const bombArr = [];

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    frameRate(30);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            if (matrix[i][j] == 1) {
                grassArr.push(new Grass(j, i, 1));
            }
            if (matrix[i][j] == 2) {
                grassEaterArr.push(new GrassEater(j, i, 1));
            }
            if (matrix[i][j] == 3) {
                bombArr.push(new Bomb(j, i, 1));
            }

        }
    }
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black")
            }
            else {
                fill("gray");
            }

            rect(side * x, side * y, side, side)
        }

    }
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].explosion();
    }
}
