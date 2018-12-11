"use strict"

var ExcluirException = require('../excluir_exception');

class ACO {
    constructor(){
        
        this.execute = function(obj) {
            var periodoAdicional = (obj.horas_incidente > 3);

            if (!periodoAdicional) {
                return;
            }

            console.log("Validando Consumo de ACO");

        	if (obj.aco) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("ACO");	
        	}
        	
        }

    }
};

module.exports = new ACO();