class Cyk{
    constructor(input, grammar) {
        this.input = input;
        this.grammar = grammar;
        this.matriz =[,,];
        this.data = []
    }

    start(){
        let size = this.input.length;

        this.data.length = this.grammar.length;
        for(let i = 0; i < this.data.length; i++){
            this.data[i]=[];
            this.data[i].length = 2;
        }
        
        this.matriz = [];
        this.matriz.length = size + 1;
        for(let i = 0; i < this.matriz.length; i++){
            this.matriz[i]=[];
            this.matriz[i].length = size;
            for(let j = 0; j < this.matriz[i].length; j++){
                this.matriz[i][j] = [];
                this.matriz[i][j].length = this.data.length;
            }
        }

        for (let i = 0; i < this.input.length; i++){
            this.matriz[size][i][0] = this.input.substring(i, i+1);
            
        }

        for (let i = 0; i < this.grammar.length; i++){
            this.data[i][0] = this.grammar[i].substring(0, 1);
            // console.log(this.grammar[i].substring(0, 1))
            
            this.data[i][1] = this.grammar[i].substring(this.grammar[i].indexOf("->") + 2);
            // console.log(this.grammar[i].substring(this.grammar[i].indexOf("->") + 2))

            // console.log(this.data)
        }

        for (let j = this.matriz.length - 1; j > 0; j--){
            if (j == size){
                for (let i = 0; i < this.matriz[j].length; i++){
                    let num = 0;
                    for (let k = 0; k < this.data.length; k++){
                        let auxString = this.data[k][1].split('|');
                        for (let y = 0; y < auxString.length; y++){
                            if (this.matriz[j][i][0] == auxString[y]){
                                this.matriz[j - 1][i][num] = this.data[k][0];
                                num++;
                            }
                        }

                    }
                }
            }else{
                for (let i = 0; i < j; i++){ 
                    for (let k = this.matriz.length - 2; k >= j; k--){
                        for (let m = 0; m <= this.matriz.length - j - 2; m++){
                            for (let l = 0; l < this.matriz[0][0].length; l++){
                                if (this.matriz[k, i, l] != null){
                                    for (let n = 0; n < this.matriz[0][0].length; n++){
                                        if (this.matriz[j + m, i + m + 1, n] != null){
                                            for (let g = 0; g < this.data.length; g++){
                                                let auxString = this.data[g][1].split('|');
                                                for (let o = 0; o < auxString.length; o++){
                                                    if (auxString[o] == this.matriz[k][i][l] + this.matriz[j + m][i + m + 1][n]){
                                                        for (let h = 0; h < this.matriz[0][0].length; h++){
                                                            if (this.matriz[j - 1][i][h] != this.data[g][0]){   
                                                                if (this.matriz[j - 1][i][h] == null){
                                                                    console.log("AAAAA")
                                                                    this.matriz[j - 1][i][h] = this.data[g][0];
                                                                    break;
                                                                }
                                                            }else{
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }else{
                                            break;
                                        }
                                    }
                                }else{
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(this.matriz)
        console.log(this.data)
        return this.checkAcceptation();
    }

    checkAcceptation(){
        let value = false;
        let answer = "si";
        for (let i = 0; i < this.matriz[0][0].length; i++){
            if (this.matriz[0][0][i] == this.data[0][0]) {
                value = true;
            }
        }
        if (value != true){
            answer = "no";
        }
        return "La palabra \"" + this.input + "\" " + answer + " pertenece a la gramatica dada";
    }
}