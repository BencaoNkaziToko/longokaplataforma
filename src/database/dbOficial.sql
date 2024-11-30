-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para db_longoka_modulo_1
CREATE DATABASE IF NOT EXISTS `db_longoka_modulo_1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_longoka_modulo_1`;

-- Copiando estrutura para tabela db_longoka_modulo_1.administrador
CREATE TABLE IF NOT EXISTS `administrador` (
  `idAdmin` int NOT NULL AUTO_INCREMENT,
  `nomeCompleto` varchar(30) DEFAULT NULL,
  `nomeUsuario` varchar(30) DEFAULT NULL,
  `senha` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idAdmin`),
  UNIQUE KEY `nomeUsuario_UNIQUE` (`nomeUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.administrador: ~8 rows (aproximadamente)
INSERT INTO `administrador` (`idAdmin`, `nomeCompleto`, `nomeUsuario`, `senha`) VALUES
	(1, 'Bênção Nkazi Toko', 'Benny', '1234'),
	(2, 'Sacala', 'Sacala', '1234'),
	(3, 'Marta', 'Marta', '1234'),
	(4, 'TOKO', 'TS', '1234567890'),
	(5, 'Vilma', 'v', '$2a$10$U2YfFfTjxVorV/H5O62Qjeea5CSzeqZ4a.0/ibo/SfGamcPqZRSxW'),
	(6, 'a', 'a', '$2a$10$VZhOOPjkrdcc6vfPpqev5eDaxv9KF1Cud359ekVyt0su9DMqRWFrK'),
	(7, 'B', 'B', '$2a$10$PReqaSc.t5Cbh0tJ7/n3ou6UadsJX97BHYNnCMqz1h4g8.eWC0yPa'),
	(8, 'c', 'c', '$2a$10$nBPFgViYZVxFreDb8hkgaO5bV2G5EO73vyVjcHOBzoSfDY932t0MG');

-- Copiando estrutura para tabela db_longoka_modulo_1.conta
CREATE TABLE IF NOT EXISTS `conta` (
  `idConta` int NOT NULL AUTO_INCREMENT,
  `nomeUsuario` varchar(30) DEFAULT NULL,
  `senha` varchar(30) DEFAULT NULL,
  `nomeInstituicao` varchar(90) DEFAULT NULL,
  `provinciaInstituicao` varchar(90) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `estado` enum('Pendete','Ativa','Recusada','Bloqueada') DEFAULT NULL,
  `idInstituicao` int DEFAULT NULL,
  PRIMARY KEY (`idConta`),
  KEY `FK_CONTA_2` (`idInstituicao`),
  CONSTRAINT `FK_CONTA_2` FOREIGN KEY (`idInstituicao`) REFERENCES `instituicao` (`idInstituicao`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.conta: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela db_longoka_modulo_1.curso
CREATE TABLE IF NOT EXISTS `curso` (
  `idCurso` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) DEFAULT NULL,
  `duracao` int DEFAULT NULL,
  `gradeCurricular` varchar(100) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `idInstituicao` int DEFAULT NULL,
  PRIMARY KEY (`idCurso`),
  KEY `FK_CURSO_2` (`idInstituicao`),
  CONSTRAINT `FK_CURSO_2` FOREIGN KEY (`idInstituicao`) REFERENCES `instituicao` (`idInstituicao`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.curso: ~19 rows (aproximadamente)
INSERT INTO `curso` (`idCurso`, `nome`, `duracao`, `gradeCurricular`, `descricao`, `idInstituicao`) VALUES
	(1, 'Economia', 5, 'userFile-qEPjijeUHH.pdf', 'Auditoria na gestao de RH', 1),
	(2, 'Medicina', 5, 'CBF.pdf', 'Contabilidade', 1),
	(3, 'Ciencias da Computacao', 5, 'userFile-mjdciP1CN6.pdf', 'Contabilidade', 1),
	(4, 'Engenharia Electrotecnia', 5, 'ERT.pdf', 'TIC', 1),
	(5, 'Engenharia Informatica', 5, 'EI.pdf', 'TIC', 1),
	(6, 'Engenharia Civil', 5, 'CC.pdf', 'Ciencias', 1),
	(7, 'Matematica', 5, 'Dr.pdf', 'Matematica Aplicada', 1),
	(8, 'Logistica e Gestao Comercial', 5, 'LGC.pdf', 'Comercio e gestao', 1),
	(9, 'Hotelaria e Turismo', 5, 'HT.pdf', 'Ciencia Hoteleira e turistica', 1),
	(10, 'Engenharia Informatica', 5, 'EI.pdf', 'Ciencia e Tecnologia', 1),
	(12, 'Enfermagem', 5, 'Enf.pdf', 'Ciencias da saude', 1),
	(13, 'Analises clinicas e saude pubica', 5, 'AnsP.pdf', 'Ciencias da saude', 1),
	(14, 'Direito', 5, 'Gest.pdf', 'Ciencias sociais e humanas', 1),
	(19, 'Engenharia Quimica', 5, 'userFile-kYwGJ4dPdm.pdf', 'Quimica aplicada na engenharia', 1),
	(22, 'Direito', 5, '', 'Ciencias Juridicas', 4),
	(23, 'Agronomia', 5, '', 'Ciencias da terra.', 4),
	(24, 'Engenharia Hidraulica e Sanemento de Aguas', 5, 'nulo.pdf', 'Engenharia Hidrica e Electrotecnia', 4),
	(25, 'Economia', 4, 'nulo.pdf', 'Economia', 4),
	(26, 'Medicina', 6, 'null', 'Saúde', 4),
	(27, 'Medicina', 6, 'userFile-zFCmBS9EQW.pdf', 'Saúde', 13);

-- Copiando estrutura para tabela db_longoka_modulo_1.instituicao
CREATE TABLE IF NOT EXISTS `instituicao` (
  `idInstituicao` int NOT NULL AUTO_INCREMENT,
  `nomeInstituicao` varchar(90) NOT NULL,
  `sigla_acronomo` varchar(30) DEFAULT NULL,
  `tipo` varchar(90) DEFAULT NULL,
  `endereco` varchar(90) DEFAULT NULL,
  `site_oficial` varchar(100) DEFAULT NULL,
  `telefone1` varchar(30) DEFAULT NULL,
  `telefone2` varchar(30) DEFAULT NULL,
  `idProvincia` int DEFAULT NULL,
  PRIMARY KEY (`idInstituicao`),
  KEY `FK_INSTITUICAO_2` (`idProvincia`),
  CONSTRAINT `FK_INSTITUICAO_2` FOREIGN KEY (`idProvincia`) REFERENCES `provincia` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.instituicao: ~2 rows (aproximadamente)
INSERT INTO `instituicao` (`idInstituicao`, `nomeInstituicao`, `sigla_acronomo`, `tipo`, `endereco`, `site_oficial`, `telefone1`, `telefone2`, `idProvincia`) VALUES
	(1, 'Universidade Agostinho Neto', 'UAN', 'Pública', 'Bairro 11 de Novembro - Talatona', 'www.uan.co.ao', '0989878', '4', 11),
	(4, 'Universidade Kimpavita', 'UNIKIVI', 'Pública', 'Condo Benge', 'www.unikivi.co.ao', '0989878', '4', 17),
	(13, 'Universidade Catolica', 'UCAN', 'Privada', 'Palanca', 'www.ucan.com', '6', 'undefined', 11);

-- Copiando estrutura para tabela db_longoka_modulo_1.log
CREATE TABLE IF NOT EXISTS `log` (
  `idLog` int NOT NULL AUTO_INCREMENT,
  `nomeOperacao` varchar(100) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `idAutor` int DEFAULT NULL,
  `dataOperacao` date DEFAULT NULL,
  `estado` enum('Sucesso','Falhada') DEFAULT NULL,
  PRIMARY KEY (`idLog`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.log: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela db_longoka_modulo_1.material_didactico
CREATE TABLE IF NOT EXISTS `material_didactico` (
  `idMaterial` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(90) NOT NULL,
  `autor` varchar(90) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `editora` varchar(30) DEFAULT NULL,
  `idConta` int DEFAULT NULL,
  `dataCadastro` date DEFAULT NULL,
  `caminho` varchar(200) DEFAULT NULL,
  `categoria` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idMaterial`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.material_didactico: ~12 rows (aproximadamente)
INSERT INTO `material_didactico` (`idMaterial`, `titulo`, `autor`, `descricao`, `editora`, `idConta`, `dataCadastro`, `caminho`, `categoria`) VALUES
	(10, 'dores que não doem', 'ana', 'uu', 'fc', NULL, '2024-04-16', 'userFile-GpkZqkBcxe.pdf', 'Arte'),
	(11, 'yy', '', '', 'fv', NULL, '2024-04-16', 'userFile-27Z4NIs865.pdf', 'Lituratura'),
	(12, 'cccc', 'aa', '', 'x', NULL, '2024-04-16', 'userFile-uzSHysCgvW.pdf', 'Ciências Exactas'),
	(13, 'cv', 'b', '', 's', NULL, '2024-04-16', 'userFile-eqp7Q2ak3B.pdf', 'Educação'),
	(14, 'xqa', 'd', 'c', 'c', NULL, '2024-04-16', 'userFile-bD8qgoDJxn.pdf', 'Saúde'),
	(15, 'jv', 'c', 'd', 'x', NULL, '2024-04-16', 'userFile-xREc9XkyLE.pdf', 'Línguas & Letras'),
	(16, 'cv', 'd', 'c', 'd', NULL, '2024-04-17', 'userFile-wOZ7St2jZl.pdf', 'Tecnologia'),
	(17, 'dores que não doem', 'aaaaaaa', 'uu', 'fv', NULL, '2024-04-19', 'userFile-UgCxNEvCAx.pdf', 'Tecnologia'),
	(18, 'dores que não doem', 'aaaaaaaa', 'aaaaa', 'a', NULL, '2024-04-19', 'userFile-8peQECDMsz.pdf', 'Tecnologia'),
	(19, 'dores que não doem', 'd', 'uu', 'fc', NULL, '2024-04-19', 'userFile-tNDigXG1rl.pdf', 'Saúde'),
	(20, 'yy', 'd', 'uu', 'fc', NULL, '2024-04-19', 'userFile-ruz9RRA2kP.pdf', 'Ciências Sociais'),
	(21, 'dores que não doem', 'c', 'c', 'x', NULL, '2024-04-19', 'userFile-a7Qdo4XU2A.pdf', 'Saúde');

-- Copiando estrutura para tabela db_longoka_modulo_1.notificacao
CREATE TABLE IF NOT EXISTS `notificacao` (
  `idNotificacao` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(200) DEFAULT NULL,
  `dataNotificacao` date DEFAULT NULL,
  `idConta` int DEFAULT NULL,
  `idAdmin` int DEFAULT NULL,
  PRIMARY KEY (`idNotificacao`),
  KEY `FK_NOTIFICACAO_2` (`idConta`),
  KEY `FK_NOTIFICACAO_3` (`idAdmin`),
  CONSTRAINT `FK_NOTIFICACAO_2` FOREIGN KEY (`idConta`) REFERENCES `conta` (`idConta`) ON DELETE CASCADE,
  CONSTRAINT `FK_NOTIFICACAO_3` FOREIGN KEY (`idAdmin`) REFERENCES `administrador` (`idAdmin`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.notificacao: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela db_longoka_modulo_1.provincia
CREATE TABLE IF NOT EXISTS `provincia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeProvincia` varchar(90) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.provincia: ~18 rows (aproximadamente)
INSERT INTO `provincia` (`id`, `nomeProvincia`) VALUES
	(1, 'Bengo'),
	(2, 'Benguela'),
	(3, 'Bié'),
	(4, 'Cabinda'),
	(5, 'Cuando Cubango'),
	(6, 'Cuanza Norte'),
	(7, 'Cuanza Sul'),
	(8, 'Cunene'),
	(9, 'Huambo'),
	(10, 'Huíla'),
	(11, 'Luanda'),
	(12, 'Lunda Norte'),
	(13, 'Lunda Sul'),
	(14, 'Malanje'),
	(15, 'Moxico'),
	(16, 'Namibe'),
	(17, 'Uíge'),
	(18, 'Zaire');

-- Copiando estrutura para tabela db_longoka_modulo_1.provs
CREATE TABLE IF NOT EXISTS `provs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomeProvincia` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.provs: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela db_longoka_modulo_1.saida_profissional
CREATE TABLE IF NOT EXISTS `saida_profissional` (
  `idEspecialidade` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) DEFAULT NULL,
  `idCurso` int DEFAULT NULL,
  PRIMARY KEY (`idEspecialidade`),
  KEY `FK_ESPECIALIDADE_2` (`idCurso`),
  CONSTRAINT `FK_ESPECIALIDADE_2` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.saida_profissional: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela db_longoka_modulo_1.solicitacao_conta
CREATE TABLE IF NOT EXISTS `solicitacao_conta` (
  `idSolicitacao` int NOT NULL AUTO_INCREMENT,
  `dataSolicitacao` date DEFAULT NULL,
  `idConta` int DEFAULT NULL,
  `idAdmin` int DEFAULT NULL,
  PRIMARY KEY (`idSolicitacao`),
  KEY `FK_SOLICITACAO_CONTA_2` (`idAdmin`),
  CONSTRAINT `FK_SOLICITACAO_CONTA_2` FOREIGN KEY (`idAdmin`) REFERENCES `administrador` (`idAdmin`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela db_longoka_modulo_1.solicitacao_conta: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
