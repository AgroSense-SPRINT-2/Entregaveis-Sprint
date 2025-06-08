var database = require("../database/config");

function buscarUltimasMedidas(fkSensor, limite_linhas) {

    var instrucaoSql = ` SELECT 
            UmidadeSolo,
            DATE_FORMAT(DtLeitura, '%H:%i:%s') AS momento_grafico,
            FkSensor
        FROM Leitura
        WHERE FkSensor = ${fkSensor}
        ORDER BY DtLeitura DESC
        LIMIT ${limite_linhas};
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fkSensor) {

    var instrucaoSql = `SELECT 
            UmidadeSolo,
            DATE_FORMAT(DtLeitura, '%H:%i:%s') AS momento_grafico,
            FkSensor
        FROM Leitura
        WHERE FkSensor = ${fkSensor}
        ORDER BY DtLeitura DESC
        LIMIT 1;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function quadrantesCriticos() {
    var instrucaoSql = `SELECT COUNT(*) AS quadrantesCriticos,
    GROUP_CONCAT(quadrante SEPARATOR ', ') AS nomeQuadrantes
    FROM (
    SELECT 
        q.IdQuadrante,
        q.quadrante,
        AVG(l.UmidadeSolo) AS umidadeMedia
    FROM Quadrante q
    JOIN Sensor s ON s.FkQuadrante = q.IdQuadrante
    JOIN Leitura l ON l.FkSensor = s.IdSensor
    WHERE s.StatusSensor = 'Ativo'
      AND l.DtLeitura = (
          SELECT MAX(l2.DtLeitura)
          FROM Leitura l2
          WHERE l2.FkSensor = s.IdSensor
      )
    GROUP BY q.IdQuadrante, q.quadrante
    ) AS mediasQuadrantes
    WHERE umidadeMedia < 20;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function umidadeIdealQuadrantes() {
    var instrucaoSql = `SELECT COUNT(CASE WHEN UmidadeMedia BETWEEN 20 AND 60 THEN 1 END) AS quadrantesDentroFaixa,
    COUNT(*) AS totalQuadrantes
    FROM (
    SELECT q.IdQuadrante,
        AVG(l.UmidadeSolo) AS umidadeMedia
    FROM Quadrante q
        JOIN Sensor s ON s.FkQuadrante = q.IdQuadrante
        JOIN Leitura l ON l.FkSensor = s.IdSensor
    WHERE s.StatusSensor = 'Ativo'
        AND l.DtLeitura = (
          SELECT MAX(l2.DtLeitura)
          FROM Leitura l2
          WHERE l2.FkSensor = s.IdSensor
      )
    GROUP BY q.IdQuadrante
    ) AS mediasQuadrantes;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSensoresFalhos() {
    var instrucaoSql = `SELECT (SELECT COUNT(*) FROM Sensor 
    WHERE StatusSensor NOT LIKE 'Ativo') AS Inativos, COUNT(IdSensor) AS Total FROM Sensor;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alertasSensores() {
    var instrucaoSql = `SELECT COUNT(IdLeitura) as Alertas FROM Leitura
    WHERE (UmidadeSolo < 20 or UmidadeSolo > 60) and DATE(DtLeitura) = CURDATE();`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alertasModal() {
    var instrucaoSql = `SELECT IdSensor, 
    UmidadeSolo, 
    Quadrante.quadrante AS Quadrante, 
    DATE_FORMAT(DtLeitura, '%d-%m-%Y %H:%i') as Dados FROM Leitura
    JOIN Sensor ON FkSensor = IdSensor
    JOIN Quadrante ON FkQuadrante = IdQuadrante
    WHERE (UmidadeSolo < 20 or UmidadeSolo > 60) and DATE(DtLeitura) = CURDATE()
    ORDER BY DtLeitura DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    quadrantesCriticos,
    umidadeIdealQuadrantes,
    buscarSensoresFalhos,
    alertasSensores,
    alertasModal
}
