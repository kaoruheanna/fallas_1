var fs = require('fs');

var TiempoAguja = require('./rules/tiempo_aguja');
var Edad = require('./rules/edad');
var ExcluirException = require('./rules/excluir_exception');


evaluar('inputs/caso1.json');
evaluar('inputs/caso2.json');


function evaluar(filePath) {
	var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	
	console.log("Evaluando ",obj.nombre);
	
	try {
		TiempoAguja.execute(obj);
		Edad.execute(obj);	


		console.log("administrar tromobolitico a: ",obj.nombre);
	} catch (e) {
	  	if (e instanceof ExcluirException) {
	    	console.log("Excluir paciente del tratamiento")
	  	
	  	} else {
	    	console.log("error:" + e.name + ': ' + e.message);
	  	}
	}
	console.log("");
}

