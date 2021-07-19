function Rover(location = [0, 0], direction = 'N', obstacles = null) {
    this.location = location;
    this.obstacles = obstacles
    this.directions = ['N', 'E', 'S', 'W'];

    this.direction = direction;

    if (direction === 'N') this.dir = 0;
    else if (direction === 'E') this.dir = 1;
    else if (direction === 'S') this.dir = 2;
    else if (direction === 'W') this.dir = 3;



    this.commands = (commands) => {
        if (this.direction === 'N') this.directionDoc = 'North';
        else if (this.direction === 'E') this.directionDoc = 'East';
        else if (this.direction === 'S') this.directionDoc = 'South';
        else if (this.direction === 'W') this.directionDoc = 'West';

        if (commands === undefined)
            return `current coordinates in [${this.location}] and its direction is ${this.directionDoc} `;
        else {
            for (let index = 0; index < commands.length; index++) {
                let command = commands[index];
                if (command === 'f' || command === 'b') {
                    if (!this.move(command)) {
                        return `its obstacle, current coordinates in [${this.location}] and its direction is ${this.directionDoc}`;
                    }
                } else if (command === 'l' || command === 'r') {
                    this.rotate(command);
                };
            };

            return `current coordinates in [${this.location}] and its direction is ${this.directionDoc} `;
        };
    };

    this.move = (command) => {
        var xInc = 0, yInc = 0;
        if (this.direction === 'N') {
            yInc = 1;
        } else if (this.direction === 'E') {
            xInc = 1;
        } else if (this.direction === 'S') {
            yInc = -1;
        } else if (this.direction === 'W') {
            xInc = -1;
        }
        if (command === 'b') {
            xInc *= -1;
            yInc *= -1;
        }
        let newLocation = [this.location[0] + xInc, this.location[1] + yInc];

        if (!this.obstacles) {
            this.location = newLocation;
            return true;
        }
        else if (!this.isObstacle(newLocation)) {
            this.location = newLocation;
            return true;
        }
        else { return false; }
    };

    this.isObstacle = (newLocation) => {
        for (var index = 0; index < this.obstacles.length; index++) {
            if (this.equals(newLocation, this.obstacles[index])) {
                return true;
            }
        }
        return false;
    };

    this.equals = (a, b) =>
        a.length === b.length &&
        a.every(
            (v, i) => v === b[i]
        );


    this.rotate = (command) => {
        if (command === 'l') {
            this.dir = (this.dir - 1);
            if (this.dir === -1) this.dir = 3;
        } else {
            this.dir = (this.dir + 1);
            if (this.dir === 4) this.dir = 0;
        }
        this.direction = this.directions[this.dir];
    };



}


const rover1 = new Rover([0, 0], 'N', [[1, 2]]);
// rover1.isObstacle([1, 1]);
// console.log(rover1.isObstacle([0, 1]));
console.log(rover1.commands('ffrf'));
// console.log(rover1.location);
