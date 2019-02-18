class Tile {
    constructor() {
        this._frontColor = "tan";
        this._backColor = "salmon";
        this._type = "regular";

        this._element = document.createElement("div");
        this._element.style.backgroundColor = this._frontColor;
        this._element.style.display = "inline-block";
        this._element.style.margin = "3px 5px";
    }

    get() {
        return this._element;
    }

    setSpecial() {
        this._type = "special";
        this._frontColor = "tan";
        this._backColor = "dodgerblue";
    }

    setRegular() {
        this._type = "regular";
        this._frontColor = "tan";
        this._backColor = "salmon";
    }

    setSize(size) {
        this._element.style.width = size;
        this._element.style.height = size;
    }

    flipFront() {
        this._element.classList.remove("rotateX180");
        this._element.classList.add("rotateX0");
        this._element.style.backgroundColor = this._frontColor;
    }

    flipBack() {
        this._element.classList.remove("rotateX0");
        this._element.classList.add("rotateX180");
        this._element.style.backgroundColor = this._backColor;
    }

    reset() {
        this.flipFront();
        this._element.classList.remove("rotateX0");
        this._element.classList.remove("rotateX180");
        this.setRegular();
    }
}