Create database AgroSense;
use AgroSense;

create table Endereco (
IdEndereco int primary key auto_increment,
logradouro varchar(45) not null,
numero char(7) not null,
CEP char (9) not null,
UF char (2) not null,   
complemento varchar(45)
);

create table Empresa (
IdEmpresa int primary key auto_increment,
NomeFantasia varchar(100) not null,
CNPJ char(14) not null,
fkEndereco int unique not null,
constraint EmpresaEndereco foreign key (FkEndereco) references Endereco(IdEndereco) 
);

create table Usuario (
IdUsuario int primary key auto_increment,
Nome varchar(45) not null,
Email varchar(45) not null,
Senha varchar(45) not null
);

create table Terreno (
IdTerreno int primary key auto_increment,
TamanhoHectares float,
FkEmpresa int unique not null, 
constraint TerrenoEmpresa foreign key (FkEmpresa) references Empresa(IdEmpresa) 
);

create table Quadrante (
IdQuadrante int auto_increment,
FkTerreno int unique not null,
constraint TerrenoQuadrante primary key (IdQuadrante, FkTerreno),
quadrante varchar(45) not null
);

create table Sensor (
IdSensor int primary key auto_increment,
Nome Varchar(45),
dtInstalacao date,
StatusSensor varchar(45),
FkTerreno int not null,
FkQuadrante int not null, 
constraint SensorTerreno foreign key(FkTerreno) references Terreno(IdTerreno),
constraint SensorQuadrante foreign key(FkQuadrante) references Quadrante(IdQuadrante)
);

create table Leitura (
IdLeitura int primary key auto_increment,
UmidadeSolo float,
DtLeitura datetime,
FkSensor int,
constraint LeituraSensor foreign key(FkSensor) references Sensor(IdSensor)
);