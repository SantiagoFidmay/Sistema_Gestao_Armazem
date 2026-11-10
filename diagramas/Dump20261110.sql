-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_logistock
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fornecedores`
--

DROP TABLE IF EXISTS `fornecedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornecedores` (
  `codFornecedor` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(100) NOT NULL,
  PRIMARY KEY (`codFornecedor`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedores`
--

LOCK TABLES `fornecedores` WRITE;
/*!40000 ALTER TABLE `fornecedores` DISABLE KEYS */;
INSERT INTO `fornecedores` VALUES (1,'Tech Distribuidora','U2FsdGVkX1+KXNZpqXHoZ5B1CGYMDeB0bJoN/+S9ghg=','contato@tech.com','47999999999'),(2,'Brasil Atacado','U2FsdGVkX1/D87NicQio5jQb0f1+6fAQ5Gaf97xt7UE=','contato@brasil.com','47988888888'),(3,'Global Produtos','U2FsdGVkX19WqlSed92HdP+ABTC4uUdVr0RtZk610H0=','contato@global.com','47977777777'),(4,'Global Produtos','U2FsdGVkX1/EEk7ss1Y5FFbUfYZAIPnAv1GUw/pckEg=','contato@global.com','47977777777'),(5,'Global Produtos','U2FsdGVkX1+3I9eNtOyoAyD13O9EFD6Ju+Sm4wqkTeY=','contato@global.com','47977777777'),(6,'Tech Distribuidora','U2FsdGVkX1/TsFj5nq+JRhajXRvHFI8FUPWTbfGQ7T8=','contato@tech.com','47999999999'),(7,'Brasil Atacado','U2FsdGVkX182cXwIAhNrZHBQ4N6kxkDlKZ1r9E/0Ju4=','contato@brasil.com','47988888888'),(8,'Global Produtos','U2FsdGVkX199cckJzUOCxhF/1psdJP7lkydnPVSPsY8=','contato@global.com','47977777777'),(9,'teste','U2FsdGVkX18ear5eDSDejYIN1xnO4zuyQM+WOI5bkoQ=','contato@global.com','47977777777');
/*!40000 ALTER TABLE `fornecedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `codFuncionario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`codFuncionario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Roberto','roberto@gmail.com','U2FsdGVkX18/4G+LwqJehs9uvK16XfzbPcZKa1QxWQM='),(2,'Roberto','roberto@gmail.com','U2FsdGVkX18Oo+cJzk4098eCbQLhCNm0vLwaTJhDRgI=');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimentos`
--

DROP TABLE IF EXISTS `movimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimentos` (
  `codMovimento` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('ENTRADA','SAIDA') NOT NULL,
  `quantidade` int NOT NULL,
  `data` date NOT NULL,
  `idProduto` int NOT NULL,
  PRIMARY KEY (`codMovimento`),
  KEY `idProduto` (`idProduto`),
  CONSTRAINT `movimentos_ibfk_1` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimentos`
--

LOCK TABLES `movimentos` WRITE;
/*!40000 ALTER TABLE `movimentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `codProduto` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `quantidade` int NOT NULL,
  `codLote` varchar(100) NOT NULL,
  `idFornecedor` int NOT NULL,
  PRIMARY KEY (`codProduto`),
  KEY `idFornecedor` (`idFornecedor`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`idFornecedor`) REFERENCES `fornecedores` (`codFornecedor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Notebook Dell','Eletronicos',50,'U2FsdGVkX18UHLHhrQV4AHqcVBvo1LgA1RvNuxCe7GQ=',1),(2,'Cadeira Escritorio','Moveis',100,'U2FsdGVkX1/euI/O6Zs3zgO05imGQCiALgrn9FddK9c=',2),(3,'Monitor Samsung','Eletronicos',75,'U2FsdGVkX18BiNyAR975bhB3djMrslub1Pzw6oso7aI=',3),(4,'Notebook Dell','Eletronicos',50,'U2FsdGVkX1+4Hm3XhMnE4oKU0TpqjWtBdx5BFAhSldg=',1);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-10  9:18:51
