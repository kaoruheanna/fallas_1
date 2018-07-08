var fs = require('fs');

var ExcluirException = require('./rules/excluir_exception');
var TiempoAguja = require('./rules/tiempo_aguja');
var Edad = require('./rules/edad');
var AcvIsquemico = require('./rules/acv_isquemico');
var NihssAbsoluto = require('./rules/nihss_absoluto');



evaluar('inputs/caso1.json');
// evaluar('inputs/caso2.json');


function evaluar(filePath) {
	var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	var criteriosAbsolutos = [
		TiempoAguja,
		Edad,
		AcvIsquemico,
		NihssAbsoluto
	];

	console.log("Evaluando ",obj.nombre);
	
	try {
		for (var criterio of criteriosAbsolutos) {
			criterio.execute(obj);
		}
	
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

