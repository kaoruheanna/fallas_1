"use strict"

var ExcluirException = require('../excluir_exception');

class EdadAdicional {
    constructor(){
        
        this.execute = function(obj) {
            var periodoAdicional = (obj.horas_incidente > 3);

            if (!periodoAdicional) {
                return;
            }

            console.log("Validando edad adicional: menor o igual a 80");

        	if (obj.edad > 80) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("periodoAdicional");	
        	}
        	
        }

    }
};

module.exports = new EdadAdicional();