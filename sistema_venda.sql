CREATE DATABASE Sistema_Venda;

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(100) NOT NULL,
  `numero` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `instagram` varchar(170) NOT NULL,
  `data_cadastro` datetime NOT NULL DEFAULT current_timestamp(),
  `data_ingresso` date NOT NULL,
  `outras_informacoes` text NOT NULL,
  `status` int(11) NOT NULL, 
  PRIMARY KEY (id_cliente)
);

CREATE TABLE `produtos` (
  `id_produto` int(11) NOT NULL AUTO_INCREMENT,
  `nome_produto` varchar(200) NOT NULL,
  `descricao` text NOT NULL,
  `categoria` varchar(150) NOT NULL,
  `valor` decimal(7,2) NOT NULL,
  `data_cadastro` datetime NOT NULL DEFAULT current_timestamp(),
  `inicio_venda` date NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (id_produto)
);

CREATE TABLE `vendas` (
  `id_venda` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `desconto` decimal(7,2) NOT NULL,
  `valor_total` decimal(7,2) NOT NULL,
  `data_cadastro` datetime NOT NULL DEFAULT current_timestamp(),
  `data_compra` date NOT NULL,
  `forma_pagamento` varchar(100) NOT NULL,
  PRIMARY KEY (id_venda)
);