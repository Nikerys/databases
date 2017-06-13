DROP DATABASE IF EXISTS `chat`;
CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS `usernames`;
    
CREATE TABLE `usernames` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` CHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `roomname` CHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `usernameID` INTEGER NOT NULL,
  `roomID` INTEGER NOT NULL,
  `text` VARCHAR(140) NOT NULL,
  PRIMARY KEY (`id`)
);


ALTER TABLE `messages` ADD FOREIGN KEY (usernameID) REFERENCES `usernames` (`id`)
ON DELETE CASCADE;
ALTER TABLE `messages` ADD FOREIGN KEY (roomID) REFERENCES `rooms` (`id`)
ON DELETE CASCADE;