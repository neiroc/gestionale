-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 02, 2016 at 04:57 PM
-- Server version: 5.5.46-0+deb8u1
-- PHP Version: 5.6.14-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gest`
--

-- --------------------------------------------------------

--
-- Table structure for table `an_anagrafiche`
--

CREATE TABLE IF NOT EXISTS `an_anagrafiche` (
`id_anagrafica` int(10) NOT NULL,
  `tipo_anagrafica` varchar(250) NOT NULL,
  `nome` varchar(250) NOT NULL,
  `mobile` varchar(250) NOT NULL,
  `tel_fisso` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `sede_legale` varchar(50) NOT NULL,
  `piva` varchar(50) NOT NULL,
  `ind_fatt` varchar(50) NOT NULL,
  `ref_amm` varchar(50) NOT NULL,
  `ref_comm` varchar(50) NOT NULL,
  `tel_refcomm` varchar(50) NOT NULL,
  `email_refcomm` varchar(50) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `an_anagrafiche`
--

INSERT INTO `an_anagrafiche` (`id_anagrafica`, `tipo_anagrafica`, `nome`, `mobile`, `tel_fisso`, `email`, `sede_legale`, `piva`, `ind_fatt`, `ref_amm`, `ref_comm`, `tel_refcomm`, `email_refcomm`, `start_date`) VALUES
(1, 'Amministratore', 'Matteo Squarcella', '0039 347 0715855 ', '0', 'matteos@contract-italy.com', '', '0', '', '', '', '0', '', '2016-02-01 19:27:58'),
(2, 'Operatore Interno', 'Rita Orsi', '0039 3397633963', '0', 'info@contract-italy.com', '', '0', '', '', '', '0', '', '2016-02-01 19:33:14'),
(43, 'Cliente', 'Flavio Briatore', 'wqeqw', 'ewqeqwe', 'qweqwe', 'qewqweqw', 'ewqe', 'wqeqwe', 'eqwewq', '', '', '', '2016-02-13 17:01:06');

-- --------------------------------------------------------

--
-- Table structure for table `co_commesse`
--

CREATE TABLE IF NOT EXISTS `co_commesse` (
`id` int(11) NOT NULL,
  `id_commessa` int(11) NOT NULL,
  `cliente` varchar(50) NOT NULL,
  `costo_proposto` decimal(10,2) NOT NULL,
  `cliente_strategico` varchar(2) NOT NULL,
  `aperta_da` varchar(50) NOT NULL,
  `data_apertura` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `operatore` varchar(50) NOT NULL,
  `tipo_operatore` varchar(20) NOT NULL,
  `tipo_attivita` varchar(20) NOT NULL,
  `costo_operatore` decimal(10,0) NOT NULL,
  `tariffa` decimal(10,2) NOT NULL,
  `volume_ore` varchar(20) NOT NULL,
  `sede` varchar(50) NOT NULL,
  `euro_ora` decimal(10,2) NOT NULL,
  `euro_giorno` decimal(10,2) NOT NULL,
  `euro_km` decimal(10,2) NOT NULL,
  `euro_tl` decimal(10,2) NOT NULL,
  `nota` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `co_commesse`
--

INSERT INTO `co_commesse` (`id`, `id_commessa`, `cliente`, `costo_proposto`, `cliente_strategico`, `aperta_da`, `data_apertura`, `operatore`, `tipo_operatore`, `tipo_attivita`, `costo_operatore`, `tariffa`, `volume_ore`, `sede`, `euro_ora`, `euro_giorno`, `euro_km`, `euro_tl`, `nota`) VALUES
(11, 6, 'Emilio Genovese', 13.00, 'NO', 'Rita Orsi', '2016-02-07 11:24:11', 'undefined', 'Interno', 'Controllo QualitÃ ', 0, 0.00, '<200', 'Torino Via dell''industria', 12.00, 0.00, 12.00, 12.00, 'Il lavoro disabilita gli uomini'),
(18, 12, 'Flavio Spendaccione', 20.00, 'SI', 'Matteo Squarcella', '2016-02-09 19:55:04', 'undefined', 'Interno', 'Controllo QualitÃ ', 0, 0.00, '<200', 'Vii Srtoe', 15.00, 0.00, 0.00, 0.00, ''),
(19, 12, 'Matteo Squarcella', 20.00, '', 'Manuele', '2016-02-13 17:15:18', 'undefined', 'Interno', 'Controllo QualitÃ ', 0, 0.00, '<200', 'Vii Srtoe', 15.00, 0.00, 0.00, 0.00, '');

-- --------------------------------------------------------

--
-- Table structure for table `co_ore`
--

CREATE TABLE IF NOT EXISTS `co_ore` (
`id` int(11) NOT NULL,
  `id_commessa` int(11) NOT NULL,
  `data` varchar(10) NOT NULL,
  `operatore` varchar(50) NOT NULL,
  `team_leader` varchar(2) NOT NULL,
  `cliente` varchar(50) NOT NULL,
  `ore_std` int(11) NOT NULL,
  `ore_extra` int(11) NOT NULL,
  `ore_fest` int(11) NOT NULL,
  `ore_sabato` int(11) NOT NULL,
  `pezzi` int(11) NOT NULL,
  `spese` int(11) NOT NULL,
  `km` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `co_ore`
--

INSERT INTO `co_ore` (`id`, `id_commessa`, `data`, `operatore`, `team_leader`, `cliente`, `ore_std`, `ore_extra`, `ore_fest`, `ore_sabato`, `pezzi`, `spese`, `km`) VALUES
(21, 6, '08/02/2016', 'Manuele', '', '', 8, 0, 0, 0, 0, 0, 0),
(22, 12, '09/02/2016', 'Alfredo Manotosta1', '', '', 8, 0, 0, 0, 0, 0, 0),
(23, 12, '11/02/2016', 'Alfredo Manotosta', '', '', 8, 0, 0, 0, 0, 0, 0),
(24, 6, '11/02/2016', 'Alfredo Manotosta', '', '', 8, 0, 0, 0, 0, 0, 0),
(25, 6, '09/02/2016', 'Manuele', '', '', 8, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `of_offerte`
--

CREATE TABLE IF NOT EXISTS `of_offerte` (
`id_offerta` int(11) NOT NULL,
  `aperta_da` varchar(50) NOT NULL,
  `cliente` varchar(50) NOT NULL,
  `quadro` varchar(2) NOT NULL,
  `costo_proposto` decimal(10,2) NOT NULL,
  `cliente_strategico` varchar(2) NOT NULL,
  `data_apertura` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `operatore` varchar(50) NOT NULL,
  `tipo_operatore` varchar(20) NOT NULL,
  `tipo_attivita` varchar(20) NOT NULL,
  `euro_ora` decimal(10,2) NOT NULL,
  `tariffa` decimal(10,2) NOT NULL,
  `volume_ore` varchar(20) NOT NULL,
  `rischio` varchar(2) NOT NULL,
  `sede` varchar(50) NOT NULL,
  `euro_pezzo` decimal(2,2) NOT NULL,
  `euro_giorno` decimal(10,2) NOT NULL,
  `euro_km` decimal(10,2) NOT NULL,
  `euro_tl` decimal(10,2) NOT NULL,
  `nota` varchar(200) NOT NULL,
  `euro_pastog` decimal(10,2) NOT NULL,
  `pagamento` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `of_offerte`
--

INSERT INTO `of_offerte` (`id_offerta`, `aperta_da`, `cliente`, `quadro`, `costo_proposto`, `cliente_strategico`, `data_apertura`, `operatore`, `tipo_operatore`, `tipo_attivita`, `euro_ora`, `tariffa`, `volume_ore`, `rischio`, `sede`, `euro_pezzo`, `euro_giorno`, `euro_km`, `euro_tl`, `nota`, `euro_pastog`, `pagamento`) VALUES
(18, 'Matteo Squarcella', 'Matteo Squarcella', 'si', 20.00, 'SI', '2016-03-02 15:53:18', '', 'interno', 'Controllo QualitÃ ', 11.00, 0.00, '<200', '', '', 0.00, 0.00, 0.00, 0.00, '', 0.00, 'Contanti'),
(19, 'Matteo Squarcella', 'Matteo Squarcella', 'no', 20.00, 'SI', '2016-03-02 15:53:41', '', 'interno', 'Controllo QualitÃ ', 11.00, 0.00, '<200', '', '', 0.00, 0.00, 0.00, 0.00, '', 0.00, 'Contanti');

-- --------------------------------------------------------

--
-- Table structure for table `re_reports`
--

CREATE TABLE IF NOT EXISTS `re_reports` (
`id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `an_anagrafiche`
--
ALTER TABLE `an_anagrafiche`
 ADD PRIMARY KEY (`id_anagrafica`), ADD UNIQUE KEY `nome` (`nome`);

--
-- Indexes for table `co_commesse`
--
ALTER TABLE `co_commesse`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id_offerta` (`id`);

--
-- Indexes for table `co_ore`
--
ALTER TABLE `co_ore`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `unique_index` (`data`,`id_commessa`);

--
-- Indexes for table `of_offerte`
--
ALTER TABLE `of_offerte`
 ADD PRIMARY KEY (`id_offerta`), ADD UNIQUE KEY `id_offerta` (`id_offerta`);

--
-- Indexes for table `re_reports`
--
ALTER TABLE `re_reports`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `an_anagrafiche`
--
ALTER TABLE `an_anagrafiche`
MODIFY `id_anagrafica` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `co_commesse`
--
ALTER TABLE `co_commesse`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `co_ore`
--
ALTER TABLE `co_ore`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `of_offerte`
--
ALTER TABLE `of_offerte`
MODIFY `id_offerta` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `re_reports`
--
ALTER TABLE `re_reports`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
