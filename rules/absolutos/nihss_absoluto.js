"use strict"

var ExcluirException = require('../excluir_exception');

class NihssAbsoluto {
    constructor(){
        
        this.execute = function(obj) {
        	console.log("Validando NIHSS Absoluto: mayor o igual a 4");

        	if (obj.nihss < 4) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("NihssAbsoluto");	
        	}
        	
        }


    }
};

module.exports = new NihssAbsoluto();