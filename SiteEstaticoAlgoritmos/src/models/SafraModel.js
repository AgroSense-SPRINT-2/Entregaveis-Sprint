var database = require("../database/config");
function listarSafras() {
  let instrucao = `
    SELECT 
      NomeCultura,
      DATE_FORMAT(DataInicio, '%b/%Y') AS Periodo,
      QuantidadeProduzidaKg,
      QuantidadePerdidaKg
    FROM Safra;
  `;
  return database.executar(instrucao);
}
module.exports = {
    listarSafras
};