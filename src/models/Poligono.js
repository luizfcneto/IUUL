export default class Poligono {
    #vertices;

    constructor(verticesArray){
        if(verticesArray.length < 3){
            throw new Error("Não foi possivel criar um Poligono");
        }else {
            this.#vertices = verticesArray;
            
        }
    }

    addVertice(novoVertice){
        const found = this.#vertices.find(vertice => {
            return vertice.equals(novoVertice);
        });

        if(!found){
            this.#vertices.push(novoVertice);
            return true;
        }
    }

    getVertices(){
        return this.#vertices;
    }

    get perimetro(){
        let perimetro = 0;
        let i = 0;
        for(; i < this.#vertices.length - 1; i++){
            const distancia = this.#vertices[i].distancia(this.#vertices[i+1]);
            perimetro += distancia;
        }
        perimetro = perimetro + this.#vertices[i].distancia(this.#vertices[0]);
        return perimetro;
    }

    get qtdVertices(){
        return this.#vertices.length;
    }

    toString() {
        return `Polígono com ${this.qtdVertices} vértices. Perímetro: ${parseFloat(this.perimetro).toFixed(2)}`;
    }
}