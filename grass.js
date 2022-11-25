var LivingCreature = require("./LivingCr.js");

module.exports = class Grass extends LivingCreature{

    constructor(x, y, index) {
        super()
        this.mulNumb = 0;
        this.socket = io();
    }
    // constructor(x, y, index) {
    //     this.x = x;
    //     this.y = y;
    //     this.index = index;
    //     this.multiply = 0;
    //     this.directions = [
    //         [this.x - 1, this.y - 1],
    //         [this.x, this.y - 1],
    //         [this.x + 1, this.y - 1],
    //         [this.x - 1, this.y],
    //         [this.x + 1, this.y],
    //         [this.x - 1, this.y + 1],
    //         [this.x, this.y + 1],
    //         [this.x + 1, this.y + 1]
    //     ];
    // }
    // chooseCell(character) {
    //     var found = [];
    //     for (var i in this.directions) {
    //         var x = this.directions[i][0];
    //         var y = this.directions[i][1];
    //         if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
    //             if (matrix[y][x] == character) {
    //                 found.push(this.directions[i]);
    //             }
    //         }
    //     }
    //     return found;

    // }
    random(){
        let found = this.chooseCell(0);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        if (newCell && this.multiply >= 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.mulNumb++;
            // socket.on('send mulNumber', this.mulNumb)
            io.sockets.emit('send mulNumber', this.mulNumb)
            this.multiply = 0;
        }
        
    }

}