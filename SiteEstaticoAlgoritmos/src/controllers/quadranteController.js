var quadranteModel = require("../models/quadranteModel");

function listarQuadrantes(req, res) {
    quadranteModel.listarQuadrantes().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

async function buscarSensoresAtivos(req, res) {
    const idQuadrante = req.params.idQuadrante;
    try {
        const [row] = await quadranteModel.buscarSensoresAtivos(idQuadrante);
        res.json({
            sensoresAtivos: row.sensoresAtivos,
            totalSensores: row.totalSensores
        });
    } catch (err) {
        console.error("Erro ao buscar KPI de sensores:", err);
        res.status(500).send(err.sqlMessage);
    }
}


function buscarUltimasMedidasQuadrante(req, res) {
    const idQuadrante = req.params.idQuadrante;

    quadranteModel.buscarUltimasMedidasQuadrante(idQuadrante).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealQuadrante(req, res) {
    const idQuadrante = req.params.idQuadrante;

    quadranteModel.buscarMedidasEmTempoRealQuadrante(idQuadrante).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listarQuadrantes,
    buscarSensoresAtivos,
    buscarUltimasMedidasQuadrante,
    buscarMedidasEmTempoRealQuadrante
}