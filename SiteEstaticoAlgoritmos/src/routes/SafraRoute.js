var express = require("express");
var router = express.Router();

// Importa seu controller de safra
var safraController = require("../controllers/SafraController");

// Exemplo de rota GET para listar safra
router.get("/safras", function(req, res) {
    safraController.listarSafras(req, res);
});


// Exporta o router para usar no app.js
module.exports = router;
