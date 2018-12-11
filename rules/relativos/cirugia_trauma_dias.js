"use strict"

var ExcluirException = require('../excluir_exception');

class CirugiaTraumaDias {
    constructor(){

        function executeCirugia(obj){
            var key = 'cirugia_mayor_dias';
            var shouldConsider = obj.hasOwnProperty(key);

            if (!shouldConsider) {
                return;
            }

            console.log("Validando Cirugia mayor mayor o igual 14");

            if (obj[key] < 14) {
                console.log("no cumple requisito");
                throw new ExcluirException("Cirugia Mayor"); 
            }
        }

        function executeTrauma(obj){
            var key = 'trauma_dias';
            var shouldConsider = obj.hasOwnProperty(key);

            if (!shouldConsider) {
                return;
            }

            console.log("Validando Trauma mayor o igual 14");

            if (obj[key] < 14) {
                console.log("no cumple requisito");
                throw new ExcluirException("Trauma"); 
            }
        }
        
        this.execute = function(obj) {
            executeCirugia(obj);
            executeTrauma(obj);
        }

    }
};

module.exports = new CirugiaTraumaDias();