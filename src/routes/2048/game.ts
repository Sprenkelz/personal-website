export class Game {

    gameArray: Array<Array<number>>;
    numFilled: number;
    won: boolean;

    constructor() {
        this.gameArray = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
	    this.numFilled = 0;
        this.won = false;

        this.genRandomTile();
        this.genRandomTile();
    }

    genRandomTile() {
		let tile: number = Math.floor(Math.random() * (16 - this.numFilled));
        let num: number = Math.random() < 0.1 ? 4 : 2;
		let count: number = -1;
		
		for (let row = 0; row < this.gameArray.length; row++) {
			for (let col = 0; col < this.gameArray[0].length; col++) {

                if (this.gameArray[row][col] === 0) {
					count++;
				}
                if (count === tile) {
                    this.gameArray[row][col] = num;
                    this.numFilled++;
                    row = 100;
                    col = 100;
                }

			}
		}		

	}

    restart() {
        this.gameArray = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
	    this.numFilled = 0;
        this.won = false;

        this.genRandomTile();
        this.genRandomTile();
    }

    lost() {
        let tempArray = structuredClone(this.gameArray);
        let tempNum = this.numFilled;
        tempArray = this.move(tempArray);
        tempArray = this.transposeArray(this.flipArrayLR(this.move(this.flipArrayLR(this.transposeArray(tempArray)))));
        if (tempNum === this.numFilled) {
            return true;
        }
        else {
            this.numFilled = tempNum;
            return false;
        }
    }

    doMove(key: string) {
        if (key === 'd') {
            this.gameArray = this.move(this.gameArray);
        }
        else if (key === 'a') {

            this.gameArray = this.flipArrayLR(this.flipArrayUD(this.move(this.flipArrayUD(this.flipArrayLR(this.gameArray)))));
        }
        else if (key === 'w') {
            this.gameArray = this.transposeArray(this.flipArrayLR(this.move(this.flipArrayLR(this.transposeArray(this.gameArray)))));
        }
        else if (key === 's') {
            this.gameArray = this.transposeArray(this.flipArrayUD(this.move(this.flipArrayUD(this.transposeArray(this.gameArray)))));
        }
        else {
            return;
        }

        this.genRandomTile();
    }

    private move(array: Array<Array<number>>) {
        //combine
        for (let row = 0; row < array.length; row++) {
            let previous = -1;
            let previousRow = -1;
            let previousCol = -1;
            for (let col = array[0].length - 1; col >= 0; col--) {
                if (array[row][col] != 0) {
                    if (array[row][col] === previous) {
                        array[row][col] *= 2;
                        if (array[row][col] === 2048) {
                            this.won = true;
                        }
                        array[previousRow][previousCol] = 0;
                        this.numFilled--;
                        previous = -1;
                    }
                    else {
                        previous = array[row][col];
                        previousRow = row;
                        previousCol = col;
                    }
                }
            }
        }

        //shift
        for (let row = 0; row < array.length; row++) {
            let lastCol = array[0].length - 1;
            for (let col = array[0].length - 1; col >= 0; col--) {
                if (array[row][col] != 0) {
                    let temp = array[row][col];
                    array[row][col] = 0;
                    array[row][lastCol] = temp;
                    lastCol--;
                }
            }
        }

        return array;
    }

    private transposeArray(array: Array<Array<number>>) {
        for (let row = 0; row < array.length; row++) {
            for (let col = row; col < array[0].length; col++) {
                let temp = array[row][col]
                array[row][col] = array[col][row];
                array[col][row] = temp;
            }
        }

        return array;
    }

    private flipArrayLR(array: Array<Array<number>>) {
        for (let row = 0; row < array.length; row++) {
            for (let i = 0, j = array[0].length - 1; i < Math.ceil(array[0].length / 2); i++, j--) {
                let temp = array[row][i];
                array[row][i] = array[row][j];
                array[row][j] = temp;
            }
        }

        return array;
    }

    private flipArrayUD(array: Array<Array<number>>) {
        for (let col = 0; col < array.length; col++) {
            for (let i = 0, j = array[0].length - 1; i < Math.ceil(array[0].length / 2); i++, j--) {
                let temp = array[i][col];
                array[i][col] = array[j][col];
                array[j][col] = temp;
            }
        }

        return array;
    }
}