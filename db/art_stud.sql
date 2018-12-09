SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


CREATE DATABASE `ArtStud` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ArtStud`;


CREATE TABLE IF NOT EXISTS `categories` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `nume` varchar(30) DEFAULT NULL,
  `descriere` varchar(100) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `images` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `id_categorie` smallint(5) DEFAULT NULL,
  `id_utilizator` smallint(5) DEFAULT NULL,
  `titlu` varchar(50) DEFAULT NULL,
  `descriere` varchar(100) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `nume` varchar(50) DEFAULT NULL,
  `prenume` varchar(50) DEFAULT NULL,
  `numeUtilizator` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `parola` varchar(50) DEFAULT NULL,
  `descriere` varchar(100) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id_produse` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `messages` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `id_utilizator` smallint(5) DEFAULT NULL,
  `nume` varchar(50) DEFAULT NULL,
  `prenume` varchar(50) DEFAULT NULL,
  `usernameDestinatar` varchar(50) DEFAULT NULL,
  `subiect` varchar(50) DEFAULT NULL,
  `continut` text DEFAULT NULL,
  `telefon` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

