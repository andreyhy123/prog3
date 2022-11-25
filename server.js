var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
 });
 grassArr = [];
 grassEaterArr = [];
  bombArr = [];
  humanArr = [];
// var livingCr = require('./LivingCr.js');
var Bomb = require('./bomb.js');
var Grass = require('./grass.js');
var GrassEater = require('./grassEater.js');
// var Human = require('./human.js');


server.listen(3000);

matrix = [];

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
    io.sockets.emit("send matrix", matrix)
    console.log("generator()334234324234234324324324234324234")
}


generator(100, 100);

function createObject(){
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
            // if (matrix[i][j] == 5) {
            //     humanArr.push(new Human(j, i, 1));
            // }

        }
    }
    console.log("createObject()")
    io.sockets.emit("send matrix", matrix)
}

function game(){
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
        console.log("game()/for/grassarr");
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].explosion();
    }
    // for (let i = 0; i < humanArr.length; i++) {
    //     humanArr[i].eat();
    // }
    io.sockets.emit("send matrix", matrix);
    io.socket.on('send mulNumber', this.mulNumb)
    console.log(this.mulNumb)

    console.log("game()fdgdfgdfgdfgdgdfgdfgdf")
}

setInterval(game, 250);

io.on('connection', function (socket) {
    createObject()
    // console.log("io.on111111112123131231232131231232131232132112312313")
 });
 