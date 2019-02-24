class Manager {
    constructor() {
        if (!Manager.instance) {
            this._floor = [];
            this._special_index = [];
            Manager.instance = this;
        }
        return Manager.instance;
    }

    add() {
        let tile = new Tile();
        this.attachClick(tile);
        this._floor.push(tile);
    }

    get(number) {
        return this._floor[number];
    }

    getAll() {
        return this._floor;
    }

    setUpTiles(number_of_tiles) {
        for (let i = 0; i < number_of_tiles; ++i) {
            this.add();
        }
    }

    setUpSpecialTiles(number_of_special, tile_number) {
        let range = this.populateSpecialRange(tile_number);
        for (let i = 0; i < number_of_special; ++i) {
            this._floor[range[i]].setSpecial();
            this._special_index.push(range[i]);
        }
    }

    resetTiles() {
        for (let i = 0; i < this._floor.length; ++i) {
            this._floor[i].reset();
        }
        this._special_index.length = 0;
    }

    setSize(x, y) {
        let divisor = this.calculateDiagonal(x, y);
        let size = 100 / Math.max(x, y);//(divisor+1);
        let marginTotal = 10;
        for (let i = 0; i < this._floor.length; ++i) {
            this._floor[i].setSize(`calc(${size}% - ${marginTotal}px`);
        }
    }

    attachClick(tile) {
        let that = this;
        let downgrade = false;
        tile.get().onclick = function () {
            if (that.flipTile(tile) === true) {
                if (tile._type == "special") {
                    ++score;
                    ++special_flipped;
                } else {
                    --score;
                    downgrade = true;
                }
                updateScore(downgrade);
            }
        }
    }

    flipTile(tile) {
        return tile.flipBack();
    }

    flipSpecial() {
        for (let i = 0; i < this._special_index.length; ++i) {
            this._floor[this._special_index[i]].flipBack();
        }
    }

    unflipSpecial() {
        for (let i = 0; i < this._special_index.length; ++i) {
            this._floor[this._special_index[i]].flipFront();
        }
    }

    calculateDiagonal(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    populateSpecialRange(total) {
        let specialRange = [];
        for (let i = 0; i < total; ++i) {
            specialRange.push(i);
        }
        return this.shuffle(specialRange);
    }

    disableAllClick() {
        for (let i = 0; i < this._floor.length; ++i) {
            this._floor[i].disableClickEvent();
        }
    }

    enableAllClick() {
        for (let i = 0; i < this._floor.length; ++i) {
            this._floor[i].enableClickEvent();
        }
    }

    shuffle(array) {
        let current_index = array.length, temp, random_index;

        while (0 !== current_index) {
            random_index = Math.floor(Math.random() * current_index);
            current_index -= 1;

            temp = array[current_index];
            array[current_index] = array[random_index];
            array[random_index] = temp;
        }

        return array;
    }
}