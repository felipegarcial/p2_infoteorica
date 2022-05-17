class Cyk{
    constructor(input, grammar) {
        this.input = input;
        this.grammar = grammar;
        this.matriz =[,,];
        this.data = []
    }

    /**
     * En este metodo se realizan las construcciones 
     * de las matrices, se rellenan, y se procesan
     * @returns string
     */
    start(){
        //el tamaño (size) para crear la matriz
        let size = this.input.length;

        //Creamos una matriz del tamaño de instrucciones * 2
        this.data.length = this.grammar.length;
        for(let i = 0; i < this.data.length; i++){
            this.data[i]=[];
            this.data[i].length = 2;
        }
        
        /* Definimos la matriz donde guardamos cada instruccion
         * Ejemplo:[[[A,D],[C,E,F]],[[B],[H,I]]]
         */
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

        //Tomamos la palabra que se introdujo y vamos caracter por caracter
        for (let i = 0; i < this.input.length; i++){
            this.matriz[size][i][0] = this.input.substring(i, i+1);
        }

        //separamos el representante de la instruccion del resultado de la instruccion 
        for (let i = 0; i < this.grammar.length; i++){
            this.data[i][0] = this.grammar[i].substring(0, 1);            
            this.data[i][1] = this.grammar[i].substring(this.grammar[i].indexOf("->") + 2);
        }

        //Pasamos por cada instruccion ascendentemente
        for (let j = this.matriz.length - 1; j > 0; j--){
            if (j == size){
                for (let i = 0; i < this.matriz[j].length; i++){//Pasa por cada elemento de la palabra
                    let num = 0;
                    for (let k = 0; k < this.data.length; k++){//Busca la letra minuscula
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
                    for (let k = this.matriz.length - 2; k >= j; k--){//Busca ascendentemente
                        for (let m = 0; m <= this.matriz.length - j - 2; m++){//Se mueve diagonal y ascendentemente
                            for (let l = 0; l < this.matriz[0][0].length; l++){//Pasa por cada caracter del arreglo
                                if (this.matriz[k][i][l] != null){ //Valida que no esté vacio la posicion kil
                                    for (let n = 0; n < this.matriz[0][0].length; n++){//pasa por cada posicion
                                        if (this.matriz[j + m, i + m + 1, n] != null){

                                            //Aqui se empieza a realizar la busqueda de cada combinacion
                                            //la 'g' recorre la lista de la gramatica para realizar las posibles combinaciones
                                            for (let g = 0; g < this.data.length; g++){
                                                let auxString = this.data[g][1].split('|');
                                                for (let o = 0; o < auxString.length; o++){
                                                    if (auxString[o] == this.matriz[k][i][l] + this.matriz[j + m][i + m + 1][n]){//Verifica si el objeto corresponde a la combinacion
                                                        for (let h = 0; h < this.matriz[0][0].length; h++){
                                                            if (this.matriz[j - 1][i][h] != this.data[g][0]){ //Valida que no haya elementos repetidos
                                                                if (this.matriz[j - 1][i][h] == null){
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
        return this.checkAcceptation();
    }

    /**
     * Dada la matriz "matriz" y la matriz "data" verificamos 
     * si la palabra ingresada pertenece o no al lenguaje
     * @returns string
     */
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