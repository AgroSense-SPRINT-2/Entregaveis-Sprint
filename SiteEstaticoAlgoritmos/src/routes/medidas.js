var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


router.get("/leituras-real/:fkSensor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});


router.get("/leituras/:fkSensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/quadrantesCriticos", function (req, res) {
    medidaController.quadrantesCriticos(req, res);
});

router.get("/umidadeIdeal", function (req, res) {
    medidaController.umidadeIdealQuadrantes(req, res);
});

router.get("/sensoresFalhos", function (req, res) {
    medidaController.buscarSensoresFalhos(req, res);
});

router.get("/qtdAlertas", function (req, res) {
    medidaController.alertasSensores(req, res);
});

router.get("/contentModal", function (req, res) {
    medidaController.alertasModal(req, res);
});

module.exports = router;
