-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema market
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema market
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `market` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `market` ;

-- -----------------------------------------------------
-- Table `market`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `market`.`User` (
  `u_id` INT NOT NULL AUTO_INCREMENT,
  `u_email` VARCHAR(45) NOT NULL,
  `u_pw` VARCHAR(45) NOT NULL,
  `u_name` VARCHAR(45) NOT NULL,
  `u_phone` VARCHAR(15) NOT NULL,
  `u_report` INT NULL DEFAULT 0,
  `u_point` INT NULL DEFAULT 0,
  UNIQUE INDEX `u_email_UNIQUE` (`u_email` ASC) VISIBLE,
  UNIQUE INDEX `u_phone_UNIQUE` (`u_phone` ASC) VISIBLE,
  PRIMARY KEY (`u_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `market`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `market`.`Product` (
  `p_id` INT NOT NULL AUTO_INCREMENT,
  `p_thumnail` VARCHAR(45) NULL DEFAULT NULL,
  `p_image` VARCHAR(45) NULL DEFAULT NULL,
  `p_category1` VARCHAR(45) NOT NULL,
  `p_category2` VARCHAR(45) NOT NULL,
  `p_title` VARCHAR(100) NOT NULL,
  `p_price` INT NOT NULL,
  `p_listprice` INT NOT NULL,
  `p_size` VARCHAR(4) NOT NULL,
  `p_status` VARCHAR(45) NOT NULL,
  `p_puton_count` INT ZEROFILL NULL DEFAULT 0,
  `p_dirty` VARCHAR(10) NULL DEFAULT NULL,
  `p_contents` VARCHAR(200) NULL DEFAULT NULL,
  `p_trade` VARCHAR(10) NULL DEFAULT '판매중',
  `p_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `p_view` INT ZEROFILL NULL DEFAULT 0,
  `p_likeitem` INT NULL DEFAULT 0,
  `User_u_id` INT NOT NULL,
  PRIMARY KEY (`p_id`),
  INDEX `fk_Product_User1_idx` (`User_u_id` ASC) VISIBLE,
  CONSTRAINT `fk_Product_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `market`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `market`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `market`.`Order` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `User_u_id` INT NOT NULL,
  `Product_p_id` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_Seller_User1_idx` (`User_u_id` ASC) VISIBLE,
  INDEX `fk_Seller_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  CONSTRAINT `fk_Seller_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `market`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Seller_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `market`.`Product` (`p_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `market`.`ShopBasket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `market`.`ShopBasket` (
  `sb_id` INT NOT NULL AUTO_INCREMENT,
  `User_u_id` INT NULL DEFAULT NULL,
  `Product_p_id` INT NULL DEFAULT NULL,
  INDEX `fk_Basket_User1_idx` (`User_u_id` ASC) VISIBLE,
  INDEX `fk_Basket_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  PRIMARY KEY (`sb_id`),
  CONSTRAINT `fk_Basket_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `market`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Basket_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `market`.`Product` (`p_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `market`.`Questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `market`.`Questions` (
  `q_id` INT NOT NULL,
  `q_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `q_title` VARCHAR(90) NOT NULL,
  `q_contents` VARCHAR(200) NOT NULL,
  `q_answer` VARCHAR(100) NULL DEFAULT NULL,
  `User_u_id` INT NOT NULL,
  INDEX `fk_Questions_User1_idx` (`User_u_id` ASC) VISIBLE,
  PRIMARY KEY (`q_id`),
  CONSTRAINT `fk_Questions_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `market`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `market`.`Announce`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `market`.`Announce` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `post_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `post_title` VARCHAR(45) NOT NULL,
  `post_contents` VARCHAR(200) NOT NULL,
  `post_view` INT NULL DEFAULT 0,
  PRIMARY KEY (`post_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `market`.`Report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `market`.`Report` (
  `r_id` INT NOT NULL AUTO_INCREMENT,
  `r_contents` VARCHAR(100) NULL,
  `User_u_id` INT NOT NULL,
  `Product_p_id` INT NOT NULL,
  INDEX `fk_Report_User1_idx` (`User_u_id` ASC) VISIBLE,
  INDEX `fk_Report_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  PRIMARY KEY (`r_id`),
  CONSTRAINT `fk_Report_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `market`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Report_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `market`.`Product` (`p_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `market`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `market`.`Comments` (
  `c_id` INT NOT NULL AUTO_INCREMENT,
  `c_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `c_contents` VARCHAR(300) NOT NULL,
  `c_answer` VARCHAR(300) NULL DEFAULT NULL,
  `User_u_id` INT NOT NULL,
  `Product_p_id` INT NOT NULL,
  INDEX `fk_Comments_User1_idx` (`User_u_id` ASC) VISIBLE,
  INDEX `fk_Comments_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  PRIMARY KEY (`c_id`),
  CONSTRAINT `fk_Comments_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `market`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comments_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `market`.`Product` (`p_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `market`.`ProductPrice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `market`.`ProductPrice` (
  `pp_date` DATETIME NULL,
  `pp_avg_price` DOUBLE NULL DEFAULT 0,
  `Product_p_id` INT NOT NULL,
  INDEX `fk_ProductPrice_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  CONSTRAINT `fk_ProductPrice_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `market`.`Product` (`p_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
