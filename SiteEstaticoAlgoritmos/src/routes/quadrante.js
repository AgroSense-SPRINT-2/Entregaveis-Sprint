var express = require("express");
var router = express.Router();

var quadranteController = require("../controllers/quadranteController");

router.get("/listar", function (req, res) {
    quadranteController.listarQuadrantes(req, res);
});

router.get("/ativos/:idQuadrante", function (req, res) {
    quadranteController.buscarSensoresAtivos(req, res);
});

router.get("/leituras/:idQuadrante", function (req, res) {
    quadranteController.buscarUltimasMedidasQuadrante(req, res);
});

router.get("/leituras-real/:idQuadrante", function (req, res) {
    quadranteController.buscarMedidasEmTempoRealQuadrante(req, res);
});


module.exports = router;