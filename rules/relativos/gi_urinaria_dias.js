"use strict"

var ExcluirException = require('../excluir_exception');

class GiUrinariaDias {
    constructor(){

        function executeGi(obj){
            var key = 'hemorragia_gi_dias';
            var shouldConsider = obj.hasOwnProperty(key);

            if (!shouldConsider) {
                return;
            }

            console.log("Validando Hemorriagia GI mayor o igual a 21");

            if (obj[key] < 21) {
                console.log("no cumple requisito");
                throw new ExcluirException("Hemorragia Gi"); 
            }
        }

        function executeUrinaria(obj){
            var key = 'hemorragia_urinaria_dias';
            var shouldConsider = obj.hasOwnProperty(key);

            if (!shouldConsider) {
                return;
            }

            console.log("Validando Hemorriagia Urinaria mayor o igual a 21");

            if (obj[key] < 21) {
                console.log("no cumple requisito");
                throw new ExcluirException("Hemorragia Urinaria"); 
            }
        }
        
        this.execute = function(obj) {
            executeGi(obj);
            executeUrinaria(obj);
        }

    }
};

module.exports = new GiUrinariaDias();