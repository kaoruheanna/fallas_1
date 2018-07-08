"use strict"

var ExcluirException = require('../excluir_exception');

class SintomasMenores {
    constructor(){
        
        this.execute = function(obj) {
            var key = 'sintomas_menores';
            var shouldConsider = obj.hasOwnProperty(key);

            if (!shouldConsider) {
                return;
            }

            console.log("Validando Sintomas Menores");

        	if (obj[key]) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("SintomasMenores");	
        	}
        	
        }

    }
};

module.exports = new SintomasMenores();