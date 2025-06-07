var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


router.get("/leituras-real/:fkSensor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});


router.get("/leituras/:fkSensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

module.exports = router;
