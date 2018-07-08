"use strict"

var ExcluirException = require('../excluir_exception');

class AcvSevero {
    constructor(){
        
        this.execute = function(obj) {
            var periodoAdicional = (obj.horas_incidente > 3);

            if (!periodoAdicional) {
                return;
            }

            console.log("Validando Acv Severo: NIHSS menor o igual a 25");

        	if (obj.nihss > 25) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("AcvSevero");	
        	}
        	
        }

    }
};

module.exports = new AcvSevero();