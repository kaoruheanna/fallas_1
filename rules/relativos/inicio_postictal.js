"use strict"

var ExcluirException = require('../excluir_exception');

class InicioPostictal {
    constructor(){
        
        this.execute = function(obj) {
            var key = 'inicio_postictal';
            var shouldConsider = obj.hasOwnProperty(key);

            if (!shouldConsider) {
                return;
            }

            console.log("Validando Crisis al inicio con déficit neurológico postictal");

        	if (obj[key]) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("InicioPostictal");	
        	}
        	
        }

    }
};

module.exports = new InicioPostictal();