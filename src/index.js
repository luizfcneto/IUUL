import promptSync from "prompt-sync";
import Vertice from "./models/Vertice.js";
import Triangulo from "./models/Triangulo.js";
import Poligono from "./models/Poligono.js";
import Turma from "./models/Turma.js";
import Aluno from "./models/Aluno.js";

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

const criaAluno = (index = 0) => {
    let nome = prompt(`Informe o nome do aluno ${index}: `);
    let matricula = prompt(`Informe a matricula do aluno ${index}: `);
    return new Aluno(matricula, nome); 
}

const criaQtdAlunos = (qtd) => {
    let alunos = [];
    for(let i = 0; i < qtd; i++){
        console.log(`Aluno ${i + 1}`);
        const aluno = criaAluno(i);
        if(aluno){
            alunos.push(aluno);
        }
    }
    return alunos;
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
    console.log("INICIANDO QUESTÃO 4");
    let alunos = criaQtdAlunos(2);
    
    alunos.forEach(aluno => {
        let n1 = prompt(`Adicione a n1 do(a) aluno(a) ${aluno.nome}: `);
        let n2 = prompt(`Adicione a n2 do(a) aluno(a) ${aluno.nome}: `);
        aluno.lancarNota(n1, 1);
        aluno.lancarNota(n2, 2);
    });

    const turma = new Turma(alunos);

    const novoAluno = criaAluno();
    novoAluno.lancarNota(9.0, 1);
    novoAluno.lancarNota(8.7, 2);

    const aluno2 = criaAluno();
    aluno2.lancarNota('', 1);
    aluno2.lancarNota(null, 2);
    const aluno3 = criaAluno();
    
    aluno3.lancarNota(10.0, 1);
    aluno3.lancarNota(6.6, 2);
    
    const aluno4 = criaAluno();
    aluno4.lancarNota(9, 1);
    aluno4.lancarNota(9, 2);

    turma.addAluno(novoAluno);
    turma.addAluno(aluno2);
    turma.addAluno(aluno3);
    turma.addAluno(aluno4);

    turma.imprimir();

    turma.removeAluno(novoAluno);
    turma.imprimir();

    console.log("INICIANDO QUESTÃO 5");
    let nome, cpf, dataNascimento, rendaMensal, estadoCivil, dependentes, idade;

    do {
        nome = prompt('Digite o nome (mínimo 5 caracteres): ');
    } while (nome.length < 5);

    do {
        cpf = prompt('Digite o CPF (exatamente 11 dígitos): ');
    } while (cpf.length !== 11 || isNaN(cpf));

    do {
        dataNascimento = prompt('Digite a data de nascimento (DD/MM/AAAA): ');
        const [dia, mes, ano] = dataNascimento.split('/').map((element) => parseInt(element));
        const dataAtual = new Date();
        idade = dataAtual.getFullYear() - ano - ((dataAtual.getMonth() < mes || (dataAtual.getMonth() === mes && dataAtual.getDate() < dia)) ? 1 : 0);
        if (idade < 18 || isNaN(idade)) {
            console.log('O cliente deve ter pelo menos 18 anos.');
        }
    } while (idade < 18 || isNaN(idade));

    do {
        rendaMensal = parseFloat(prompt('Digite a renda mensal (com vírgula): '));
    } while (isNaN(rendaMensal) || rendaMensal < 0);

    do {
        estadoCivil = prompt('Digite o estado civil (C, S, V ou D): ').toUpperCase();
    } while (!['C', 'S', 'V', 'D'].includes(estadoCivil));

    do {
        dependentes = parseInt(prompt('Digite o número de dependentes (0 a 10): '));
    } while (isNaN(dependentes) || dependentes < 0 || dependentes > 10);

    console.log("Cliente");
    console.log(nome);
    console.log(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
    console.log(dataNascimento);
    console.log(rendaMensal.toFixed(2));
    console.log(estadoCivil);
    console.log(dependentes);
}

main();