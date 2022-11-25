var LivingCreature = require('./LivingCr.js')
module.exports = class GrassEater extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 20;
    }

    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }

    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCordinates();
        return super.chooseCell(character);
    }
 




     

    // chooseCell(character) {
    //     this.getNewCordinates();
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

    // eat() {
    //     const newCell = this.random(this.chooseCell(1));
    //     if (newCell) {
    //         console.log("EAAAAAAAAAAAAAAAAAAAAAAAAAAAAT")
    //         var newX = newCell[0];
    //         var newY = newCell[1];

    //         matrix[newY][newX] = 2;

    //         matrix[this.y][this.x] = 0;

    //         this.x = newX;
    //         this.y = newY;
    //         this.energy++;

    //         for (var i in grassArr) {
    //             console.log("123456789012345678901234567890");
    //             if (newX == grassArr[i].x && newY == grassArr[i].y) {
    //                 console.log("FOOOOOOOOOOOOOOOOOOOOREEEEEEEEEEEEEEEAT")
    //                 grassArr.splice(i, 1);
    //                 break;
    //             }
    //         }

    //         if (this.energy >= 30) {
    //             this.mul()
    //         }

    //     }
    //     else {
    //         this.move()
    //     }
    // }



    eat() {
        const newCell = this.random(1);
        if (newCell) {
            console.log("EAAAAAAAAAAAAAAAAAAAAAAAAAAAAT")
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 2;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassArr) {
                console.log("123456789012345678901234567890");
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    console.log("FOOOOOOOOOOOOOOOOOOOOREEEEEEEEEEEEEEEAT")
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 30) {
                this.mul()
            }

        }
        else {
            this.move()
        }
    }

    move() {
        // var found = this.chooseCell(0);
        var newCell = this.random(0);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 2;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy <= 0) {
            this.die();
        }
    }

    mul() {
        // var found = this.chooseCell(1);
        var newCell = this.random(1);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;



            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 10;
        }
    }

    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}
