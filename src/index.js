import promptSync from "prompt-sync";
import Vertice from "./models/Vertice.js";
import Triangulo from "./models/Triangulo.js";
import Poligono from "./models/Poligono.js";

const prompt = promptSync({sigint: true});

const criaVertice = (index) => {
    let x = prompt(`Informe a coordenada X do vertice ${index}: `);
    let y = prompt(`Informe a coordenada Y do vertice ${index}: `);
    return new Vertice(x,y); 
}

const criaTriangulo = () => {
    const vertices = criaQtdVertices(3);
    try {
        return new Triangulo(vertices[0], vertices[1], vertices[2]);
    } catch (error) {
        console.log(error.message);
        return null; 
    }
};

const criaQtdVertices = (qtd) => {
    let vertices = [];
    for(let i = 0; i < qtd; i++){
        const vertice = criaVertice(i + 1);
        vertices.push(vertice);
    }
    return vertices;
};

const criaQtdTriangulos = (qtd) => {
    let triangulos = [];
    for(let i = 0; i < qtd; i++){
        console.log(`triangulo ${i + 1}`);
        const triangulo = criaTriangulo(i + 1);
        if(triangulo){
            triangulos.push(triangulo);
        }
    }
    return triangulos;
}

const criaPoligono = () => {
    const vertices = criaQtdVertices(5);
    try {
        return new Poligono(vertices);
    }catch(error){
        console.log(error.message);
        return null;
    }
}

const criaQtdPoligonos = (qtd) => {
    let poligonos = [];
    for(let i = 0; i < qtd; i++){
        console.log(`Poligono ${i + 1}`);
        const poligono = criaPoligono(i + 1);
        if(poligono){
            poligonos.push(poligono);
        }
    }
    return poligonos;
}

const main = () => {
    console.log("INICIANDO QUESTÃO 1");
    const vertices = criaQtdVertices(2);
    console.log("Distância entre v1 e V2:", vertices[0].distancia(vertices[1]));
    console.log("Os vértices V1 e V2 são iguais?", vertices[0].equals(vertices[1]));

    vertices[0].move(6, 8);
    console.log("Nova posição de v1:", `(${vertices[0].getX()}, ${vertices[0].getY()})`);
    console.log("Os vértices são iguais após mover V1?", vertices[0].equals(vertices[1]));

    console.log("INICIANDO QUESTÃO 2");
    const triangulos = criaQtdTriangulos(3);
    triangulos.forEach((triangulo, index) => {
        console.log(`\nTriângulo ${index + 1}:`);
        console.log(triangulo.toString());
        console.log(`Perímetro: ${triangulo.perimetro()}`);
        console.log(`Área: ${triangulo.area()}`);
        console.log(`Tipo: ${triangulo.tipo()}`);
        console.log(`Clone do triângulo:`, triangulo.clone().toString());
    });

    console.log("INICIANDO QUESTÃO 3");
    const poligonos = criaQtdPoligonos(1);
    poligonos[0].getVertices().map(vertice => console.log(vertice.toString()));
    console.log(`Quantidade de vertices do poligono ${poligonos[0].qtdVertices}`);

    let novoVertice = criaVertice(1);
    console.log("Poligono novo adicionado com sucesso? ", poligonos[0].addVertice(novoVertice));
    poligonos[0].getVertices().map(vertice => console.log(vertice.toString()));
    console.log(`Quantidade de vertices do poligono ${poligonos[0].qtdVertices}`);

    console.log(`Perimetro do Poligono: ${poligonos[0].perimetro}`);

}

main();