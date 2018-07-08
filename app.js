var fs = require('fs');

var ExcluirException = require('./rules/excluir_exception');

// absolutos
var TiempoAguja = require('./rules/absolutos/tiempo_aguja');
var Edad = require('./rules/absolutos/edad');
var AcvIsquemico = require('./rules/absolutos/acv_isquemico');
var NihssAbsoluto = require('./rules/absolutos/nihss_absoluto');

// Contraindicaciones Absolutas
var ContraindicacionesAbsolutas = require('./rules/contraindicaciones_absolutas/contraindicaciones');

// adicionales
var EdadAdicional = require('./rules/adicionales/edad_adicional');
var AcvSevero = require('./rules/adicionales/acv_severo');
var ACO = require('./rules/adicionales/aco');
var AntecedentesAcvDbt = require('./rules/adicionales/antecedentes_acv_dbt');

//Relativos: solo se tienen en cuenta si está el elemento en el json
var SintomasMenores = require('./rules/relativos/sintomas_menores');
var Embarazo = require('./rules/relativos/embarazo');
var GiUrinariaDias = require('./rules/relativos/gi_urinaria_dias');
var IamMeses = require('./rules/relativos/iam_meses');
var InicioPostictal = require('./rules/relativos/inicio_postictal');
var CirugiaTraumaDias = require('./rules/relativos/cirugia_trauma_dias');




evaluar('inputs/caso1.json');
evaluar('inputs/caso2.json');
evaluar('inputs/caso3.json');
evaluar('inputs/caso4.json');
evaluar('inputs/caso5.json');
evaluar('inputs/caso6.json');


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
	];

	var criteriosRelativos = [
		SintomasMenores,
		Embarazo,
		GiUrinariaDias,
		IamMeses,
		InicioPostictal,
		CirugiaTraumaDias
	];

	console.log("-------------------");
	console.log("Evaluando ",obj.nombre);
	
	try {
		console.log("");
		console.log("Criterios Absolutos");
		for (var criterio of criteriosAbsolutos) {
			criterio.execute(obj);
		}

		console.log("");
		console.log("Contraindicaciones Absolutas");
		ContraindicacionesAbsolutas.execute(obj);

		console.log("");
		console.log("Criterios Adicionales");
		for (var criterio of criteriosAdicionales) {
			criterio.execute(obj);
		}

		console.log("");
		console.log("Criterios Relativos");
		for (var criterio of criteriosRelativos) {
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

