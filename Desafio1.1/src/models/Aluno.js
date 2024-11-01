export default class Aluno {
    #matricula;
    #nome;
    #n1;
    #n2;

    constructor(matricula, nome){
        this.#matricula = matricula;
        this.#nome = nome;
        this.#n1 = null;
        this.#n2 = null;
    }

    lancarNota(nota, prova){
        if(!isNaN(nota)){
            if(prova === 1){
                this.#n1 = parseFloat(nota); 
            }else if (prova === 2){
                this.#n2 = parseFloat(nota);

            }
        }
    }

    get matricula(){
        return this.#matricula;
    }

    get nome(){
        return this.#nome;
    }

    get n1(){
        return this.#n1;
    }

    get n2(){
        return this.#n2;
    }

    get notaFinal(){
        if(this.n1 !== null && this.n2 !== null){
            return (this.n1 + this.n2)/2;
        }else if(this.n1 !== null) {
            return this.n1/2;
        }else if(this.n2 !== null){
            return this.n2/2;
        }else {
            return 0;
        }
    }

    toString(){
        console.log("n1", typeof this.#n1);
        console.log("n2", typeof this.#n2);
        return `\t${this.matricula}\t${this.nome}\t\t${this.n1 !== null  ? this.n1 : '-'}\t${this.n2 !== null ? this.n2 : '-'}\t${this.notaFinal.toFixed(1)}\n`;
    }
}