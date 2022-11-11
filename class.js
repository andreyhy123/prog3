class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
        this.multiply++;
    }

}




class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.health = 2;
        this.directions = [];
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        const newCell = random(this.chooseCell(1));
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
        var newCell = random(found);

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
        var found = this.chooseCell(1);
        var newCell = random(found);

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





class Bomb {
    constructor(x, y){
        this.x = x;
        this.y = y;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    explosion(){
        const cells = random(this.chooseCell(1))
        const cells2 = random(this.chooseCell(2))

        if(cells){
            console.log(cells);
            var newX1 = cells[0];
            var newY1 = cells[1];

            matrix[newY1][newX1] = 4;

            matrix[this.y][this.x] = 0;

            this.x = newX1;
            this.y = newY1;


            for(var i in bombArr){
                if(newX1 == bombArr[i].x && newY1 == bombArr[i].y){
                    bombArr.splice(i, 1);
                    break;
                }
            }

            for (var i in grassArr) {
                if (newX1 == grassArr[i].x && newY1 == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        if(cells2){
            var newX2 = cells2[0];
            var newY2 = cells2[1];

            matrix[newY2][newX2] = 4;

            matrix[this.y][this.x] = 4;

                        

            this.x = newX2;
            this.y = newY2;

            for(var i in bombArr){
                if(newX2 == bombArr[i].x && newY2 == bombArr[i].y){
                    bombArr.splice(i, 1);
                    break;
                }
            }
            for(var i in grassEaterArr){
                if(newX2 == grassEaterArr[i].x && newY2 == grassEaterArr[i].y){
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}