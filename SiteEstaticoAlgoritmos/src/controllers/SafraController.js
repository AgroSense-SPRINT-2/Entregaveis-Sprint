// No controller
const safraModel = require('../models/SafraModel');

function listarSafras(req, res) {
  safraModel.listarSafras().then((resultado) => {
    res.json(resultado);
  }).catch((erro) => {
    console.error(erro);
    res.status(500).json(erro);
  });
}

module.exports = { listarSafras };
