var fs = require('fs');

var ExcluirException = require('./rules/excluir_exception');

// absolutos
var TiempoAguja = require('./rules/absolutos/tiempo_aguja');
var Edad = require('./rules/absolutos/edad');
var AcvIsquemico = require('./rules/absolutos/acv_isquemico');
var NihssAbsoluto = require('./rules/absolutos/nihss_absoluto');

// adicionales
var EdadAdicional = require('./rules/adicionales/edad_adicional');
var AcvSevero = require('./rules/adicionales/acv_severo');
var ACO = require('./rules/adicionales/aco');
var AntecedentesAcvDbt = require('./rules/adicionales/antecedentes_acv_dbt');



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

	var criteriosAdicionales = [
		EdadAdicional,
		AcvSevero,
		ACO,
		AntecedentesAcvDbt
	]

	console.log("Evaluando ",obj.nombre);
	
	try {
		console.log("");
		console.log("Criterios Absolutos");
		for (var criterio of criteriosAbsolutos) {
			criterio.execute(obj);
		}

		console.log("");
		console.log("Criterios Adicionales");
		for (var criterio of criteriosAdicionales) {
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

