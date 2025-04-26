create database AgroSense;

use AgroSense;

-- Inserindo tabelas conforme a modelagem
create table cadastroEmpresa (
	idEmpresa int primary key auto_increment,
    nomeEmpresa varchar(45) not null,
    cnpj char(14) not null,
    telContato char(13) not null,
    email varchar(45) not null unique,
    senha varchar(45) not null
);

create table login (
	idLogin int primary key auto_increment,
    fkEmpresa int,
    constraint fkEmpresaLogin
    foreign key (fkEmpresa) references cadastroEmpresa(idEmpresa),
	email varchar(45) unique,
    senha varchar(45)
);

create table endereco (
	idEndereco int primary key auto_increment,
    fkEmpresa int,
    constraint fkEmpresaEnd
    foreign key (fkEmpresa) references cadastroEmpresa(idEmpresa),
    logradouro varchar(100) not null,
    numero char(7) not null,
    complemento varchar(45),
    cep char(9) not null,
    uf char(2) not null
);

create table terreno (
	idTerreno int primary key auto_increment,
    fkEmpresa int,
    constraint fkEmpresaTerreno
    foreign key (fkEmpresa) references cadastroEmpresa(idEmpresa),
    tamanhoHectares float,
    qtdSafrasAno int
);

create table sensor (
	idSensor int primary key auto_increment,
    fkTerreno int,
    constraint fkTerrenoSensor 
    foreign key (fkTerreno) references terreno(idTerreno),
    nome varchar(45),
    dtInstalacao date,
    statusSensor varchar(13),
    constraint chkStatus check (statusSensor in ('Ativo', 'Em manutenção')),
    quadrante varchar(45)
);

create table leitura (
	idLeitura int auto_increment,
    fkSensor int,
    constraint pkComposta primary key (idLeitura, fkSensor),
    constraint fkSensorLeitura
    foreign key (fkSensor) references sensor(idSensor),
    umidadeSolo float,
    dtLeitura datetime default current_timestamp
);

-- Cadastro feitos das empresas;
insert into cadastroEmpresa (nomeEmpresa, cnpj, telContato, email, senha) values
	('Camil Alimentos S.A', '64904295000103', '1130399200', 'comercial@camil.com.br', 'feijaoCamil123'),
    ('Kicaldo Gadkin Alimentos S.A', '05456604000160', '1141626200', 'contato@kicaldo.com.br', 'kicaldoMaravilhoso231'),
    ('Josapar (Meu Bijo', '87456562000122', '08007701011', 'comercial@psapar.com.br', 'senhaJosapar123'),
    ('GDC Cereais do Brasil', '17700706000169', '6635316965', 'nortaocon@gdc.com.br', 'gotadelimao123@'),
    ('Castrolanda Cooperativa Agroindustrial', '76108349000103', '423234800', 'contato@castrolanda.coop.br', 'miojoDeGalinha321!');
    
-- Login cedido para a empresa Camil;    
insert into login (fkEmpresa, email, senha) values 
	(1, 'adminCamil@camil.com.br', 'admin1234@');
    
-- Inserindo os endereços da sede das empresas;
insert into endereco (fkEmpresa, logradouro, numero, complemento, cep, uf) values
	(1, 'Avenida Rebouças', '3970', 'Andar 12° Sala Camil', '05402-918', 'SP'),
	(2, 'Avenida Grimaldo Tolaini', '1436', 'Andar 6° Sala 01', '06443-009', 'SP'),
	(3, 'Avenida Carlos Gomes', '651', '5º Andar', '90480-003', 'RS'),
	(4, 'Rua dos Barus', '26', '2º Piso Sala 03', '78550-130', 'MT'),
	(5, 'Rodovia PR 340 Km 195', 'S/N', 'Colônia Castrolanda', '84196-200', 'PR');

-- Inserindo os terrenos das plantações, referenciando as empresas pela fkEmpresa;
INSERT INTO terreno (fkEmpresa, tamanhoHectares, qtdSafrasAno) VALUES
	(1, 15.05, 2),
	(2, 20.00, 3),
	(3, 18.075, 2),
	(4, 22.00, 3),
	(5, 25.00, 2);

-- Sensores que estão na plantação da parceira Camil;
INSERT INTO sensor (fkTerreno, nome, dtInstalacao, statusSensor, quadrante) VALUES
	(1, 'Sensor de Umidade 1', '2025-04-15', 'Ativo', 'Quadrante Superior Esquerdo'),
	(1, 'Sensor de Umidade 2', '2025-04-15', 'Ativo', 'Quadrante Superior Direito'),
	(1, 'Sensor de Umidade 3', '2025-04-15', 'Ativo', 'Quadrante Inferior Esquerdo'),
	(1, 'Sensor de Umidade 4', '2025-04-15', 'Ativo', 'Quadrante Inferior Direito'),
	(1, 'Sensor de Umidade 5', '2025-04-15', 'Ativo', 'Centro da Plantação'),
	(1, 'Sensor de Umidade 6', '2025-04-15', 'Ativo', 'Quadrante Norte'),
	(1, 'Sensor de Umidade 7', '2025-04-15', 'Ativo', 'Quadrante Sul'),
	(1, 'Sensor de Umidade 8', '2025-04-15', 'Ativo', 'Quadrante Leste'),
	(1, 'Sensor de Umidade 9', '2025-04-15', 'Ativo', 'Quadrante Oeste'),
	(1, 'Sensor de Umidade 10', '2025-04-15', 'Ativo', 'Centro-Norte');

-- Select com as informações das tabelas;
select 
	c.nomeEmpresa as Empresas,
    c.cnpj as CNPJ,
	concat(e.logradouro, ' N° ', e.numero, ' Compl: ', e.complemento, ' CEP: ', e.cep, ' UF: ', e.uf) as Endereço,
    c.telContato as 'Telefone de contato',
    c.email as 'E-mail',
    t.tamanhoHectares as 'Tamanho do hectar (m²)',
    t.qtdSafrasAno as 'Safras por ano'
from cadastroEmpresa c join endereco e
	on e.fkEmpresa = c.idEmpresa
		join terreno t
			on t.fkEmpresa = c.idEmpresa;

-- Select para verificar se a empresa possui acesso a nossa dashboard;
select 
	c.nomeEmpresa as Empresa,
    ifnull(l.email, 'Não possui') as Login,
    ifnull(l.senha, 'N/A') as Senha
from cadastroEmpresa c join endereco e
	on e.fkEmpresa = c.idEmpresa
		left join login l 
			on l.fkEmpresa = c.idEmpresa;
        
-- Select com nome da empresa, informações do terreno, sensores e as leituras;
select 
	c.nomeEmpresa as Empresa,
    t.tamanhoHectares as 'Tamanho do hectar', 
    t.qtdSafrasAno as 'Safras por ano',
    ifnull(s.nome, 'Não possui') as 'Sensor',
    ifnull(s.dtInstalacao, 'N/A') as 'Data da instalação',
    ifnull(s.statusSensor, 'N/A') as 'Status do sensor',
    ifnull(s.quadrante, 'N/A') as 'Localização do sensor',
    ifnull(l.umidadeSolo, 'N/A') as 'Umidade do solo',
    ifnull(l.dtLeitura, 'N/A') as 'Data da leitura'
from cadastroEmpresa c join terreno t
	on t.fkEmpresa = c.idEmpresa
		left join sensor s
			on s.fkTerreno = c.idEmpresa
				left join leitura l 
					on l.fkSensor = s.idSensor;