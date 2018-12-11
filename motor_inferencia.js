var express = require('express');
var router = express.Router();
'use strict';

router.get('/decision', function(req, res) {
	console.log(req.query);
	// Criterios absolutos
	var acv_isquemico = req.query.acv_isquemico || 0;
	var edad = req.query.edad || 0;
	var horas_incidente = req.query.horas_incidente || 9;
	var nihss = req.query.nihss || 0;

	// Criterios Adicionales
	var aco = req.query.aco || 0;
	var antecedente_dbt = req.query.antecedente_dbt || 0;

	// Contraindicaciones
	var contraindicacion = req.query.contraindicacion || 1;

	inference_engine(acv_isquemico, edad, horas_incidente, nihss, aco, antecedente_dbt, contraindicacion, res);
});

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

function inference_engine(acv_isquemico, edad, horas_incidente, nihss, aco, antecedente_dbt, contraindicacion, res) {
	var fact = {
	    "acv_isquemico": acv_isquemico,
	    "edad": edad,
	    "horas_incidente": horas_incidente,
	    "nihss": nihss,
	    "aco": aco,
	    "antecedente_dbt": antecedente_dbt,
	    "contraindicacion": contraindicacion
	};

	var rules = criteriosAbsolutos.concat([ContraindicacionesAbsolutas], criteriosAdicionales, criteriosRelativos);

	try {
		for (var rule of rules){
			rule.execute(fact);
		}
		console.log("administrar tromobolitico");
		res.send("1");
	} catch (e) {
	  	if (e instanceof ExcluirException) {
	    	console.log("Excluir paciente del tratamiento");
	    	res.send("3");
	  	} else {
	    	console.log("error:" + e.name + ': ' + e.message);
	  	}
	}
}

module.exports = router;
