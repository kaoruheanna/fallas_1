var express = require('express');
var router = express.Router();
'use strict';
var RuleEngine = require('node-rules/lib/node-rules');

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

var rules = [
	{
		// Rule #1
		"condition": function(R) {
	        R.when(this.contraindicacion == 1);
	    },
	    "consequence": function(R) {
	        this.result = '3';
	        R.stop();
	    }
	} , {
		// Rule #2
		"condition": function(R) {
	        R.when(this.horas_incidente > 3 && this.aco == 1);
	    },
	    "consequence": function(R) {
	        this.result = '3';
	        R.stop();
	    }
	} , {
		// Rule #3
		"condition": function(R) {
	        R.when(this.horas_incidente > 3 && this.nihss > 25);
	    },
	    "consequence": function(R) {
	        this.result = '3';
	        R.stop();
	    }
	} , {
		// Rule #4
		"condition": function(R) {
	        R.when(this.horas_incidente > 3 && this.antecedente_dbt == 1);
	    },
	    "consequence": function(R) {
	        this.result = '3';
	        R.stop();
	    }
	} , {
		// Rule #5
		"condition": function(R) {
	        R.when(this.horas_incidente > 3 && this.edad > 80);
	    },
	    "consequence": function(R) {
	        this.result = '3';
	        R.stop();
	    }
	} , {
		// Rule #6
		"condition": function(R) {
	        R.when(this.acv_isquemico == 0);
	    },
	    "consequence": function(R) {
	        this.result = '3';
	        R.stop();
	    }
	} ,	{
		// Rule #7
		"condition": function(R){
			R.when(this.edad < 18);
		},
		"consequence": function(R){
			this.result = '3';
			R.stop();
		}
	} , {
		// Rule #8
		"condition": function(R) {
	        R.when(this.horas_incidente > 4.5);
	    },
	    "consequence": function(R) {
	        this.result = '3';
	        R.stop();
	    }
	} , {
		// Rule #9
		"condition": function(R) {
	        R.when(this.nihss < 4);
	    },
	    "consequence": function(R) {
	        this.result = '3';
	        R.stop();
	    }
	}
];

function inference_engine(acv_isquemico, edad, horas_incidente, nihss, aco, antecedente_dbt, contraindicacion, res) {
	var R = new RuleEngine();
	R.register(rules);

	var fact = {
	    "acv_isquemico": acv_isquemico,
	    "edad": edad,
	    "horas_incidente": horas_incidente,
	    "nihss": nihss,
	    "aco": aco,
	    "antecedente_dbt": antecedente_dbt,
	    "contraindicacion": contraindicacion
	};

	R.execute(fact, function(data) {
		res.send(data.result);
	});
}

module.exports = router;
