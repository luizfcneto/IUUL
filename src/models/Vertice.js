export default class Vertice {
    #x;
    #y;

    constructor(x, y){
        this.#x = x;
        this.#y = y;
    }

    getX(){
        return this.#x;
    }

    getY(){
        return this.#y;
    }

    distancia(otherVertice){
        return Math.sqrt(Math.pow((otherVertice.getX() - this.getX()), 2) + Math.pow(otherVertice.getY() - this.getY(), 2));
    }

    move(newX, newY){
        this.#x = newX;
        this.#y = newY;
    }

    equals(otherVertice){
        return this.#x === otherVertice.getX() && this.#y === otherVertice.getY();
    }

    toString(){
        return `Vertice(${this.getX()}, ${this.getY()})`;
    }

}