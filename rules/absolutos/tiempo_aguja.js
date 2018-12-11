"use strict"

var ExcluirException = require('../excluir_exception');

class TiempoAguja {
    constructor(){
        
        this.execute = function(obj) {
        	console.log("Validando Tiempo aguja: menor a 4.5 horas");

        	if (obj.horas_incidente > 4.5) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("TiempoAguja");	
        	}
        	
        }


    }
};

module.exports = new TiempoAguja();