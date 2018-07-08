"use strict"

var ExcluirException = require('../excluir_exception');

class IamMeses {
    constructor(){
        
        this.execute = function(obj) {
            var key = 'iam_meses';
            var shouldConsider = obj.hasOwnProperty(key);

            if (!shouldConsider) {
                return;
            }

            console.log("Validando IAM Meses mayor o igual a 3");

        	if (obj[key] < 3) {
        		console.log("no cumple requisito");
        		throw new ExcluirException("IamMeses");	
        	}
        	
        }

    }
};

module.exports = new IamMeses();