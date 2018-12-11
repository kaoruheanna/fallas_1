"use strict"

var ExcluirException = require('../excluir_exception');

class Edad {
    constructor(){
        
        this.execute = function(obj) {
        	console.log("Validando edad: mayor o igual a 18");

        	if (obj.edad < 18) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("Edad");	
        	}
        	
        }

    }
};

module.exports = new Edad();