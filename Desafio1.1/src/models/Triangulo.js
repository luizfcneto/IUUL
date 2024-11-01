export default class Triangulo {
    #vertices = [];

    constructor(v1, v2, v3){ 
        const dV1V2 = v1.distancia(v2);
        const dV2V3 = v2.distancia(v3);
        const dV3V1 = v3.distancia(v1);
        
        if(dV1V2 + dV2V3 > dV3V1 &&
            dV2V3 + dV3V1 > dV1V2 &&
            dV3V1 + dV1V2 > dV2V3){
                this.#vertices = [v1, v2, v3];
        } else {
            throw new Error("Não foi possível criar o Triangulo");
        }
    }

    perimetro(){
        return this.#vertices[0].distancia(this.#vertices[1]) + this.#vertices[1].distancia(this.#vertices[2]) + this.#vertices[2].distancia(this.#vertices[0]);
    }

    equals(outroTriangulo){
        if(!(outroTriangulo instanceof Triangulo)) return false;

        if(this.getVertices().length === 0 && outroTriangulo.getVertices().length === 0 || this.getVertices().length !== outroTriangulo.getVertices().length ) return false;

        const verticesIguais = (v1, v2) => v1.getX() === v2.getX() && v1.getY() === v2.getY();

        const outrosVertices = outroTriangulo.getVertices();
        return this.getVertices().some(vertice => {
            outrosVertices.some(outroVertice => verticesIguais(vertice, outroVertice));
        });

    }

    getVertices(){
        return this.#vertices;
    }

    tipo() {
        const dV1V2 = this.getVertices()[0].distancia(this.getVertices()[1]);
        const dV2V3 = this.getVertices()[1].distancia(this.getVertices()[2]);
        const dV3V0 = this.getVertices()[2].distancia(this.getVertices()[0]);

        if (dV1V2 === dV2V3 && dV2V3 === dV3V0) {
            return "Equilátero";
        } else if (dV1V2 === dV2V3 || dV2V3 === dV3V0 || dV1V2 === dV3V0) {
            return "Isósceles";
        } else {
            return "Escaleno";
        }
    }

    clone(){
        return new Triangulo(...this.#vertices);
    }

    area(){
        const dV1V2 = this.getVertices()[0].distancia(this.getVertices()[1]);
        const dV2V3 = this.getVertices()[1].distancia(this.getVertices()[2]);
        const dV3V0 = this.getVertices()[2].distancia(this.getVertices()[0]);
        const s = this.perimetro();
        return Math.sqrt(s * (s - dV1V2) * (s - dV2V3) * (s - dV3V0));
    }

    toString(){
        return `Triangulo: {\n v1: (${this.getVertices()[0].getX()}, ${this.getVertices()[0].getY()}),\n v2: (${this.getVertices()[1].getX()}, ${this.getVertices()[1].getY()}),\n v3: (${this.getVertices()[2].getX()}, ${this.getVertices()[2].getY()})\n}`;
    }

}