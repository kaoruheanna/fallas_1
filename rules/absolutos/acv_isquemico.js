"use strict"

var ExcluirException = require('../excluir_exception');

class AcvIsquemico {
    constructor(){
        
        this.execute = function(obj) {
        	console.log("Validando acv isquemico");

        	if (!obj.acv_isquemico) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("ACV Isquemico");	
        	}
        	
        }

    }
};

module.exports = new AcvIsquemico();