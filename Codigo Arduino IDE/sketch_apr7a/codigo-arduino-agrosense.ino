// Definições dos pinos e variáveis
const int PINO_SENSOR_UMIDADE_SOLO = A0;  // Pino conectado ao sensor capacitivo de umidade de solo

// Função de inicialização
void setup() {
  Serial.begin(9600);  // Inicializa a comunicação serial a 9600 bps
  pinMode(PINO_SENSOR_UMIDADE_SOLO, INPUT);  // Configura o pino como entrada
}

// Função principal de execução contínua
void loop() {
  // Lê o valor analógico do sensor de umidade
  int leituraSensor = analogRead(PINO_SENSOR_UMIDADE_SOLO);

  // Calcula a porcentagem de umidade com base na leitura do sensor
  float porcentagemUmidade = map(leituraSensor, 1023, 0, 0, 100);
  porcentagemUmidade = constrain(porcentagemUmidade, 0, 100); // Limita entre 0 e 100%
  porcentagemUmidade = porcentagemUmidade + 20;

    Serial.print(porcentagemUmidade);
    Serial.println(";");

  // Aguarda 1 segundo antes da próxima leitura
  delay(1000);
}