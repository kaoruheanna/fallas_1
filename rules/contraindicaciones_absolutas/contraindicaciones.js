"use strict"

var ExcluirException = require('../excluir_exception');

class ContraindicacionesAbsolutas {
    
    constructor(){

        function executeContraindicacion(obj, key, message) {
            if (obj.hasOwnProperty(key) && obj[key]){
                console.log("No cumple requisito: " + message);
                throw new ExcluirException(key);
            }
        }
        
        this.execute = function(obj) {
            executeContraindicacion(obj, "trauma_acv_meses", "Trauma o  ACV en los 3 meses previos");
            executeContraindicacion(obj, "hsa", "Síntomas sugestivos de HSA");
            executeContraindicacion(obj, "sangrado_intercraneal", "Historia de Sangrado Intracraneal");
            executeContraindicacion(obj, "lesion_sangrante", "Tumor cerebral, MAV, aneurisma (lesión potencialmente sangrante)");
            executeContraindicacion(obj, "ciraugia_intracraneal_intraespinal", "Cirugía intracraneal o intraespinal reciente");
            executeContraindicacion(obj, "tas", "TAS > 185");
            executeContraindicacion(obj, "tad", "TAD > 110 mmHg");
            executeContraindicacion(obj, "hemorragia_interna", "Hemorragia interna activa");
            executeContraindicacion(obj, "puncion_arterial", "Punción arterial en sitios no compresible en los 7 días previos");
            executeContraindicacion(obj, "heparina", "Heparina en las 48 hs previas con KPTT elevado por encima del límite superior");
            executeContraindicacion(obj, "aco_rin_tp", "ACO con RIN> 1,7 o TP >15 seg");
            executeContraindicacion(obj, "uso_inhibidores", "Uso de inhibidores directos del factor Xa (NOACS), con test de  laboratorio alterados (KPTT, RIN, plaquetas, Test de actividad del factor Xa, Tiempo de Ecarina)");
            executeContraindicacion(obj, "tac_infarto", "TAC con evidencia de infarto multilobar (hipodensidad>1/3 del hemisferio cerebral)");
        }

    }
};

module.exports = new ContraindicacionesAbsolutas();
