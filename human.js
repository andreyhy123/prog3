
var LivingCreature = require('./LivingCr.js')
module.exports = class Human extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.gender;
        this.energy = 20;
    }

    random(){
        let found = this.chooseCell(0);
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




    eat() {
        const newCell = this.random(this.chooseCell(1));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 2;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
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
        var found = this.chooseCell(0);
        var newCell = this.random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 5;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        // if (this.energy <= 0) {
        //     this.die();
        // }
    }





    mul() {
        var found = this.chooseCell(1);
        var newCell = this.random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;



            var newHuman = new Human(newX, newY);
            humanArr.push(newHuman);
            this.energy = 10;
        }
    }

}