-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Gen 19, 2016 alle 17:33
-- Versione del server: 5.5.46-0+deb8u1
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
-- Struttura della tabella `an_anagrafiche`
--

CREATE TABLE IF NOT EXISTS `an_anagrafiche` (
`id_anagrafica` int(10) NOT NULL,
  `nome` varchar(250) NOT NULL DEFAULT '',
  `mobile` varchar(250) NOT NULL DEFAULT '',
  `email` varchar(250) NOT NULL DEFAULT '',
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo_anagrafica` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `an_anagrafiche`
--

INSERT INTO `an_anagrafiche` (`id_anagrafica`, `nome`, `mobile`, `email`, `start_date`, `tipo_anagrafica`) VALUES
(1, 'Mario Rossi', '2121 21212 1212', 'marui@sdas.it', '2016-01-19 12:05:47', 'dsdasdasd'),
(2, 'Givanni Cuzzo', '213123 3211212', 'fsdfsdf@sdsd.it', '2016-01-19 12:05:47', 'dsadasda'),
(3, 'nome', '4342343', 'ggfd@gfgd.it', '2016-01-19 14:39:22', 'dsadasdasdsadsad'),
(4, 'sdsad', 'dsadas', 'dsada', '2016-01-19 14:43:54', 'dsadsadasdasda'),
(5, 'nome', '4342343', 'ggfd@gfgd.it', '2016-01-19 15:00:45', ''),
(6, 'nome22', '43hgjjjj42343', 'ggfd@gfgdjhg.it', '2016-01-19 15:04:00', ''),
(7, 'hfg', 'hgfhgf', 'hgfhfg', '2016-01-19 15:06:50', ''),
(8, 'hfg', 'hgfhgf', 'hgfhfg', '2016-01-19 15:08:08', ''),
(9, 'hfg', 'hgfhgf', 'hgfhfg', '2016-01-19 15:08:48', ''),
(10, 'hfg', 'hgfhgf', 'hgfhfg', '2016-01-19 15:08:53', ''),
(11, 'hfg', 'hgfhgf', 'hgfhfg', '2016-01-19 15:08:58', ''),
(12, 'hfg', 'hgfhgf', 'hgfhfg', '2016-01-19 15:09:15', ''),
(13, 'hfg', 'hgfhgf', 'hgfhfg', '2016-01-19 15:09:24', ''),
(14, 'fdsf', 'hgfhgf', 'hgfhfg', '2016-01-19 15:12:08', ''),
(15, '.hgfhfg', 'hgfhgf', 'hgfhfg', '2016-01-19 15:12:28', ''),
(16, '.Androgino', 'hgfhgf', 'hgfhfg', '2016-01-19 15:12:34', ''),
(17, 'Stocazzo', 'hgfhgf', 'hgfhfg', '2016-01-19 15:13:08', ''),
(18, 'hghfh', 'hgfhgf', 'hgfhfg', '2016-01-19 15:30:39', ''),
(19, 'PORCOOOO', 'hgfhgf', 'hgfhfg', '2016-01-19 15:30:45', ''),
(20, 'PORCOOOO', 'hgfhgf', 'hgfhfg', '2016-01-19 15:30:53', ''),
(21, 'kjhkhgk', 'hgfhgf', 'hgfhfg', '2016-01-19 15:31:21', ''),
(22, 'khjkk', 'hgfhgf', 'hgfhfg', '2016-01-19 16:15:15', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `an_anagrafiche`
--
ALTER TABLE `an_anagrafiche`
 ADD PRIMARY KEY (`id_anagrafica`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `an_anagrafiche`
--
ALTER TABLE `an_anagrafiche`
MODIFY `id_anagrafica` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
