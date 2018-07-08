"use strict"

var ExcluirException = require('../excluir_exception');

class AntecedentesAcvDbt {
    constructor(){
        
        this.execute = function(obj) {
            var periodoAdicional = (obj.horas_incidente > 3);

            if (!periodoAdicional) {
                return;
            }

            console.log("Validando Antecedentes de ACV o DBT");

        	if (obj.antecedente_acv || obj.antecedente_dbt) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("AntecedentesAcvDbt");	
        	}
        	
        }

    }
};

module.exports = new AntecedentesAcvDbt();