export default class Turma {
    #alunos = [];

    constructor(alunos){
        this.#alunos = alunos;
    }

    addAluno(alunoNovo){
        const find = this.#alunos.some(aluno => aluno.matricula == alunoNovo.matricula);
        
        if(!find){
            this.#alunos.push(alunoNovo);
        }
    }   

    removeAluno(matricula){
        // const indexFound = this.#alunos.findIndex(aluno => aluno.matricula == matricula);
        // if(indexFound !== -1){
        //     this.#alunos.splice(indexFound, 1);
        // }
        this.alunos = this.#alunos.filter(a => a.matricula !== matricula);
    }

    imprimir(){
        const alunosOrdenados = this.#alunos.sort((a1, a2) => {a1.nome.localeCompare(a2.nome)});
        console.log('-----------------------------------------------------');
        console.log(' Matricula \t Nome\t\tN1\t N2\tNF');
        alunosOrdenados.forEach(aluno => console.log(aluno.toString()));
        console.log('-----------------------------------------------------');

    }

}