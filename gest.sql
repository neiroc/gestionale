-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 11, 2016 at 09:58 PM
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
  `password` varchar(10) DEFAULT NULL,
  `sede_legale` varchar(50) NOT NULL,
  `piva` varchar(50) NOT NULL,
  `ind_fatt` varchar(50) NOT NULL,
  `ref_amm` varchar(50) NOT NULL,
  `ref_comm` varchar(50) NOT NULL,
  `tel_refcomm` varchar(50) NOT NULL,
  `email_refcomm` varchar(50) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `an_anagrafiche`
--

INSERT INTO `an_anagrafiche` (`id_anagrafica`, `tipo_anagrafica`, `nome`, `mobile`, `tel_fisso`, `email`, `password`, `sede_legale`, `piva`, `ind_fatt`, `ref_amm`, `ref_comm`, `tel_refcomm`, `email_refcomm`, `start_date`) VALUES
(1, 'Amministratore', 'Matteo Squarcella', '0039 347 0715855 ', '0', 'matteos@contract-italy.com', 'admin', '', '0', '', '', '', '0', '', '2016-02-01 19:27:58'),
(2, 'Operatore Interno', 'Rita Orsi', '0039 3397633963', '0', 'info@contract-italy.com', '', '', '0', '', '', '', '0', '', '2016-02-01 19:33:14'),
(45, 'Operatore Interno', 'Manuele', '33333333333', '333333333333', 'fdsfsdf@fdsfsd.it', '', '', '', '', '', '', '', '', '2016-03-08 15:37:08'),
(46, 'Team Leader', 'Fumagalli', '11111111111', '11111111111', 'rewrwe@erwrwe.it', '', '', '', '', '', '', '', '', '2016-03-08 18:38:10'),
(47, 'Cliente', 'Fiat', '11111111', '111111111', 'client@client.it', 'client', '', '', '', '', '', '', 'dsfsdfs@fsdfs.it', '2016-03-16 10:59:15'),
(64, 'Amministratore', 'Alessandra Trapasso', '212121121', '21212121', 'amministrazione@contract-italy.com', NULL, '', '', '', '', '', '', '', '2016-03-17 11:00:49');

-- --------------------------------------------------------

--
-- Table structure for table `co_commesse`
--

CREATE TABLE IF NOT EXISTS `co_commesse` (
`id` int(11) NOT NULL,
  `id_commessa` int(11) NOT NULL,
  `data_apertura` date NOT NULL,
  `cliente` varchar(50) NOT NULL,
  `costo_proposto` decimal(10,2) NOT NULL,
  `cliente_strategico` varchar(2) NOT NULL,
  `quadro` varchar(2) NOT NULL,
  `a_pezzo` varchar(2) NOT NULL,
  `aperta_da` varchar(50) NOT NULL,
  `tipo_operatore` varchar(20) NOT NULL,
  `tipo_attivita` varchar(20) NOT NULL,
  `costo_operatore` decimal(10,0) NOT NULL,
  `tariffa` decimal(10,2) NOT NULL,
  `volume_ore` varchar(20) NOT NULL,
  `sede` varchar(50) NOT NULL,
  `euro_ora` decimal(10,2) NOT NULL,
  `euro_pezzo` decimal(10,2) NOT NULL,
  `euro_giorno` decimal(10,2) NOT NULL,
  `euro_km` decimal(10,2) NOT NULL,
  `euro_tl` decimal(10,2) NOT NULL,
  `nota` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `co_commesse`
--

INSERT INTO `co_commesse` (`id`, `id_commessa`, `data_apertura`, `cliente`, `costo_proposto`, `cliente_strategico`, `quadro`, `a_pezzo`, `aperta_da`, `tipo_operatore`, `tipo_attivita`, `costo_operatore`, `tariffa`, `volume_ore`, `sede`, `euro_ora`, `euro_pezzo`, `euro_giorno`, `euro_km`, `euro_tl`, `nota`) VALUES
(34, 38, '2016-03-22', 'Fiat', 20.00, 'SI', 'NO', 'NO', 'Matteo Squarcella', 'interno', 'Controllo QualitÃ ', 0, 0.00, '<200', 'Colegno', 12.50, 0.00, 0.00, 0.00, 0.00, ''),
(35, 39, '2016-03-31', 'Fiat', 20.00, 'SI', 'NO', 'NO', 'Matteo Squarcella', 'interno', 'Controllo QualitÃ ', 0, 0.00, '<200', 'Colegno', 12.50, 0.00, 0.00, 0.00, 0.00, '');

-- --------------------------------------------------------

--
-- Table structure for table `co_difetti`
--

CREATE TABLE IF NOT EXISTS `co_difetti` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `seq_inizio` int(11) NOT NULL,
  `seq_fine` int(11) NOT NULL,
  `pezzi_controllati` int(11) NOT NULL,
  `difetto1` int(11) NOT NULL,
  `difetto2` int(11) NOT NULL,
  `difetto3` int(11) NOT NULL,
  `difetto4` int(11) NOT NULL,
  `difetto5` int(11) NOT NULL,
  `difetto6` int(11) NOT NULL,
  `difetto7` int(11) NOT NULL,
  `difetto8` int(11) NOT NULL,
  `difetto9` int(11) NOT NULL,
  `difetto10` int(11) NOT NULL,
  `ok` int(11) NOT NULL,
  `rilavorati` int(11) NOT NULL,
  `ko` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `co_difetti`
--

INSERT INTO `co_difetti` (`id`, `data`, `seq_inizio`, `seq_fine`, `pezzi_controllati`, `difetto1`, `difetto2`, `difetto3`, `difetto4`, `difetto5`, `difetto6`, `difetto7`, `difetto8`, `difetto9`, `difetto10`, `ok`, `rilavorati`, `ko`) VALUES
(38, '2016-04-02', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-03', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-04', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-05', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-06', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-07', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-08', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-09', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-10', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-11', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-12', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-13', 15186, 15301, 301, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-14', 15302, 15461, 289, 4, 0, 1, 4, 0, 5, 0, 1, 0, 1, 0, 0, 0),
(38, '2016-04-15', 15461, 15621, 300, 2, 2, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0),
(38, '2016-04-16', 15622, 15733, 304, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0),
(38, '2016-04-17', 15622, 15733, 304, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0),
(38, '2016-04-18', 15622, 15733, 304, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0),
(38, '2016-04-19', 15622, 15733, 304, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0),
(38, '2016-04-20', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(38, '2016-04-21', 15008, 15185, 331, 3, 2, 3, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0),
(39, '2016-04-03', 15622, 15733, 304, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(39, '2016-04-04', 15622, 15733, 304, 1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(39, '2016-04-05', 15622, 15733, 304, 1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(39, '2016-04-06', 15622, 15733, 304, 1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(39, '2016-04-07', 15622, 15733, 304, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(39, '2016-04-16', 15622, 15733, 304, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `co_ore`
--

CREATE TABLE IF NOT EXISTS `co_ore` (
  `id_commessa` int(11) NOT NULL,
  `data` date NOT NULL,
  `operatore` varchar(50) NOT NULL,
  `sede` varchar(20) NOT NULL,
  `team_leader` varchar(2) NOT NULL,
  `cliente` varchar(50) NOT NULL,
  `ore_std` int(11) NOT NULL,
  `ore_extra` int(11) NOT NULL,
  `ore_fest` int(11) NOT NULL,
  `ore_sabato` int(11) NOT NULL,
  `pezzi` int(11) NOT NULL,
  `spese` int(11) NOT NULL,
  `km` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `co_ore`
--

INSERT INTO `co_ore` (`id_commessa`, `data`, `operatore`, `sede`, `team_leader`, `cliente`, `ore_std`, `ore_extra`, `ore_fest`, `ore_sabato`, `pezzi`, `spese`, `km`) VALUES
(38, '2016-04-03', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-04', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-05', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-06', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-07', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-08', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-09', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-10', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-11', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-12', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-13', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-14', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-15', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-16', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0),
(38, '2016-04-17', 'Manuele', 'Colegno', 'NO', 'Fiat', 8, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `of_offerte`
--

CREATE TABLE IF NOT EXISTS `of_offerte` (
`id_offerta` int(11) NOT NULL,
  `aperta_da` varchar(50) NOT NULL,
  `data_apertura` date NOT NULL,
  `cliente` varchar(50) NOT NULL,
  `quadro` varchar(2) NOT NULL,
  `a_pezzo` varchar(2) NOT NULL,
  `costo_proposto` decimal(10,2) NOT NULL,
  `cliente_strategico` varchar(2) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `of_offerte`
--

INSERT INTO `of_offerte` (`id_offerta`, `aperta_da`, `data_apertura`, `cliente`, `quadro`, `a_pezzo`, `costo_proposto`, `cliente_strategico`, `tipo_operatore`, `tipo_attivita`, `euro_ora`, `tariffa`, `volume_ore`, `rischio`, `sede`, `euro_pezzo`, `euro_giorno`, `euro_km`, `euro_tl`, `nota`, `euro_pastog`, `pagamento`) VALUES
(38, 'Fumagalli', '2016-03-21', 'Fumagalli', 'NO', 'NO', 20.00, 'SI', 'interno', 'Controllo QualitÃ ', 11.00, 0.00, '<200', '', '', 0.00, 0.00, 0.00, 0.00, '', 0.00, 'Contanti'),
(39, 'Matteo Squarcella', '2016-03-22', 'Manuele', 'NO', 'NO', 20.00, 'SI', 'interno', 'Controllo QualitÃ ', 12.50, 0.00, '<200', '', '', 0.00, 0.00, 0.00, 0.00, '', 0.00, 'Contanti');

-- --------------------------------------------------------

--
-- Table structure for table `re_reports`
--

CREATE TABLE IF NOT EXISTS `re_reports` (
`id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `xt_tipo_difetto`
--

CREATE TABLE IF NOT EXISTS `xt_tipo_difetto` (
  `id` int(11) NOT NULL,
  `difetto1` varchar(50) NOT NULL,
  `difetto2` varchar(50) NOT NULL,
  `difetto3` varchar(50) NOT NULL,
  `difetto4` varchar(50) NOT NULL,
  `difetto5` varchar(50) NOT NULL,
  `difetto6` varchar(50) NOT NULL,
  `difetto7` varchar(50) NOT NULL,
  `difetto8` varchar(50) NOT NULL,
  `difetto9` varchar(50) NOT NULL,
  `difetto10` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `xt_tipo_difetto`
--

INSERT INTO `xt_tipo_difetto` (`id`, `difetto1`, `difetto2`, `difetto3`, `difetto4`, `difetto5`, `difetto6`, `difetto7`, `difetto8`, `difetto9`, `difetto10`) VALUES
(38, 'SCROSTATURE', 'RIGHE GRAFFI', 'INCOLLAGGIO CANOTTO SENSORE', 'AGGANCIO ALETTE', 'LABILITA'' TRIDENTE', 'ALLINEAMENTO SENSORI PARCHEGGIO', 'CONFORMITA'' PRESA ARIA', 'TENUTA SALDATURA', '', ''),
(39, 'SPECCHIETTI', 'PARABREZZA', 'TERGICRISTALLO', 'MANIGLIA PORTIERA', '', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `an_anagrafiche`
--
ALTER TABLE `an_anagrafiche`
 ADD PRIMARY KEY (`id_anagrafica`), ADD UNIQUE KEY `nome` (`nome`), ADD UNIQUE KEY `id_anagrafica` (`id_anagrafica`);

--
-- Indexes for table `co_commesse`
--
ALTER TABLE `co_commesse`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id_offerta` (`id`);

--
-- Indexes for table `co_difetti`
--
ALTER TABLE `co_difetti`
 ADD PRIMARY KEY (`id`,`data`);

--
-- Indexes for table `co_ore`
--
ALTER TABLE `co_ore`
 ADD PRIMARY KEY (`id_commessa`,`data`,`operatore`), ADD UNIQUE KEY `UNIQUE` (`id_commessa`,`data`,`operatore`);

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
-- Indexes for table `xt_tipo_difetto`
--
ALTER TABLE `xt_tipo_difetto`
 ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `an_anagrafiche`
--
ALTER TABLE `an_anagrafiche`
MODIFY `id_anagrafica` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=65;
--
-- AUTO_INCREMENT for table `co_commesse`
--
ALTER TABLE `co_commesse`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `of_offerte`
--
ALTER TABLE `of_offerte`
MODIFY `id_offerta` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `re_reports`
--
ALTER TABLE `re_reports`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
