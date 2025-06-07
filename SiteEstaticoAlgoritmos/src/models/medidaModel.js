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
module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
