var socket = io();
const side = 10;


function setup() {
    // createCanvas(matrix[0].length * side, matrix.length * side);
    createCanvas(600,600)
    frameRate(30);


}

function draww(matrix) {
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
            else if (matrix[y][x] == 5) {
                fill("blue")
            }
            else {
                fill("gray");
            }

            rect(side * x, side * y, side, side)

        }

    }

}
socket.on('send matrix', draww)

// function StopGame(){
//     frameRate(0);
// }

// function Start(){
//     frameRate(30);
// }
