CREATE TABLE Contatos ( 
	numero_celular       INTEGER NOT NULL    ,
	id_contato           INTEGER NOT NULL    ,
	email                VARCHAR(255) NOT NULL    ,
	numero_fixo          INTEGER     ,
	id_pessoa            INTEGER NOT NULL    ,
	CONSTRAINT pk_Contatos PRIMARY KEY ( id_contato, id_pessoa ),
	CONSTRAINT unq_Contatos UNIQUE ( email )
 );

CREATE TABLE Pessoa ( 
	nome                 VARCHAR(255) NOT NULL    ,
	id_pessoa            INTEGER NOT NULL  PRIMARY KEY  ,
	sobrenome            VARCHAR(255) NOT NULL    ,
	idade                INTEGER NOT NULL    ,
	endereco             VARCHAR(255) NOT NULL    ,
	CONSTRAINT idade UNIQUE ( idade ),
	CONSTRAINT unq_Pessoa_nome UNIQUE ( nome ),
	CONSTRAINT unq_Pessoa UNIQUE ( sobrenome ),
	CONSTRAINT unq_Pessoa_0 UNIQUE ( endereco )
 );

CREATE TABLE competencia ( 
	id_competencia       INTEGER NOT NULL    ,
	id_pessoa            INTEGER NOT NULL    ,
	hard_skill           BOOLEAN NOT NULL    ,
	soft_skill           BOOLEAN NOT NULL    ,
	competencia          BOOLEAN NOT NULL    ,
	nivel_competencia    INTEGER     ,
	CONSTRAINT pk_competencia PRIMARY KEY ( id_competencia, id_pessoa )
 );

CREATE TABLE experiencia_profissional ( 
	id_experiencia       INTEGER NOT NULL    ,
	id_pessoa            INTEGER NOT NULL    ,
	empresa              VARCHAR(255) NOT NULL    ,
	cargo                VARCHAR(255) NOT NULL    ,
	descricao_atividades VARCHAR(255)     ,
	periodo_permanencia  VARCHAR(255) NOT NULL    ,
	CONSTRAINT pk_experiencia_profissional PRIMARY KEY ( id_experiencia, id_pessoa )
 );

CREATE TABLE formacao_academica ( 
	id_formacao          INTEGER NOT NULL    ,
	pessoa_id            INTEGER NOT NULL    ,
	nome_curso           VARCHAR(255) NOT NULL    ,
	instituicao          VARCHAR(255) NOT NULL    ,
	tipo_formacao        VARCHAR(255) NOT NULL    ,
	inicio               VARCHAR(255) NOT NULL    ,
	termino              VARCHAR(255) NOT NULL    ,
	CONSTRAINT pk_formacao_academica PRIMARY KEY ( id_formacao, pessoa_id )
 );
