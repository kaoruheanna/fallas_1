"use strict"

var ExcluirException = require('../excluir_exception');

class Embarazo {
    constructor(){
        
        this.execute = function(obj) {
            var key = 'embarazo';
            var shouldConsider = obj.hasOwnProperty(key);

            if (!shouldConsider) {
                return;
            }

            console.log("Validando Embarazo");

        	if (obj[key]) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("Embarazo");	
        	}
        	
        }

    }
};

module.exports = new Embarazo();