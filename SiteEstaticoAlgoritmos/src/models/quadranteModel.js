var database = require("../database/config");

function listarQuadrantes() {
    const instrucaoSql = `
    SELECT IdQuadrante, quadrante
    FROM Quadrante;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSensoresAtivos(idQuadrante) {
    const instrucaoSql = `SELECT SUM(CASE WHEN StatusSensor = 'ativo' THEN 1 ELSE 0 END) AS sensoresAtivos,
    COUNT(*) AS totalSensores
    FROM Sensor
    WHERE FkQuadrante = ${idQuadrante};
  `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasQuadrante(idQuadrante) {
    var instrucaoSql = `SELECT ROUND(avg(UmidadeSolo), 1) as Umidade, 
    date_format(DtLeitura, '%H:%i:%s') as momento_grafico 
    FROM Leitura
    JOIN sensor ON fkSensor = idSensor
    JOIN Quadrante ON fkQuadrante = idQuadrante
    WHERE fkQuadrante = ${idQuadrante}
    GROUP BY DtLeitura, UmidadeSolo
    ORDER BY DtLeitura DESC LIMIT 10;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealQuadrante(idQuadrante) {

    var instrucaoSql = `SELECT ROUND(avg(UmidadeSolo), 1) as dado, 
    date_format(DtLeitura, '%H:%i:%s') as momento_grafico 
    FROM Leitura
    JOIN sensor ON fkSensor = idSensor
    JOIN Quadrante ON fkQuadrante = idQuadrante
    WHERE fkQuadrante = ${idQuadrante}
    GROUP BY DtLeitura, UmidadeSolo
    ORDER BY DtLeitura DESC LIMIT 10;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarQuadrantes,
    buscarSensoresAtivos,
    buscarUltimasMedidasQuadrante,
    buscarMedidasEmTempoRealQuadrante
}