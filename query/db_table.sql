-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema secondhand
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema secondhand
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `secondhand` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `secondhand` ;

-- -----------------------------------------------------
-- Table `secondhand`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`User` (
  `u_id` INT NOT NULL AUTO_INCREMENT,
  `u_admin` INT NULL DEFAULT 1,
  `u_email` VARCHAR(45) NOT NULL,
  `u_pw` VARCHAR(45) NOT NULL,
  `u_name` VARCHAR(45) NOT NULL,
  `u_phone` VARCHAR(15) NOT NULL,
  `u_stop` INT NULL DEFAULT 0,
  `u_point` INT NULL DEFAULT 0,
  `u_sign_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `u_grade` INT NULL DEFAULT 0,
  UNIQUE INDEX `u_email_UNIQUE` (`u_email` ASC) VISIBLE,
  UNIQUE INDEX `u_phone_UNIQUE` (`u_phone` ASC) VISIBLE,
  PRIMARY KEY (`u_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `secondhand`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`Product` (
  `p_id` INT NOT NULL AUTO_INCREMENT,
  `p_image` VARCHAR(100) NULL DEFAULT NULL,
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
  `User_u_id` INT NOT NULL,
  PRIMARY KEY (`p_id`),
  INDEX `fk_Product_User1_idx` (`User_u_id` ASC) VISIBLE,
  CONSTRAINT `fk_Product_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `secondhand`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `secondhand`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`Order` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `User_u_id` INT NOT NULL,
  `Product_p_id` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_Seller_User1_idx` (`User_u_id` ASC) VISIBLE,
  INDEX `fk_Seller_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  CONSTRAINT `fk_Seller_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `secondhand`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Seller_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `secondhand`.`Product` (`p_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `secondhand`.`ShopBasket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`ShopBasket` (
  `sb_id` INT NOT NULL AUTO_INCREMENT,
  `User_u_id` INT NOT NULL,
  `Product_p_id` INT NOT NULL,
  PRIMARY KEY (`sb_id`),
  INDEX `fk_ShopBasket_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  INDEX `fk_ShopBasket_User1_idx` (`User_u_id` ASC) VISIBLE,
  CONSTRAINT `fk_ShopBasket_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `secondhand`.`Product` (`p_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ShopBasket_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `secondhand`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `secondhand`.`Questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`Questions` (
  `q_id` INT NOT NULL AUTO_INCREMENT,
  `q_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `q_title` VARCHAR(90) NOT NULL,
  `q_contents` VARCHAR(200) NOT NULL,
  `q_answer` VARCHAR(100) NULL DEFAULT NULL,
  `User_u_id` INT NOT NULL,
  INDEX `fk_Questions_User1_idx` (`User_u_id` ASC) VISIBLE,
  PRIMARY KEY (`q_id`),
  CONSTRAINT `fk_Questions_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `secondhand`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `secondhand`.`Announce`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`Announce` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `post_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `post_title` VARCHAR(45) NOT NULL,
  `post_contents` VARCHAR(200) NOT NULL,
  `post_view` INT NULL DEFAULT 0,
  PRIMARY KEY (`post_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `secondhand`.`Report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`Report` (
  `r_id` INT NOT NULL AUTO_INCREMENT,
  `r_title` VARCHAR(90) NOT NULL,
  `r_contents` VARCHAR(100) NULL DEFAULT NULL,
  `User_u_id` INT NOT NULL,
  `Product_p_id` INT NOT NULL,
  INDEX `fk_Report_User1_idx` (`User_u_id` ASC) VISIBLE,
  INDEX `fk_Report_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  PRIMARY KEY (`r_id`),
  CONSTRAINT `fk_Report_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `secondhand`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Report_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `secondhand`.`Product` (`p_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `secondhand`.`ProductInquiry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`ProductInquiry` (
  `pi_id` INT NOT NULL AUTO_INCREMENT,
  `pi_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `pi_contents` VARCHAR(300) NOT NULL,
  `pi_answer` VARCHAR(300) NULL DEFAULT NULL,
  `User_u_id` INT NOT NULL,
  `Product_p_id` INT NOT NULL,
  PRIMARY KEY (`pi_id`),
  INDEX `fk_ProductInquiry_User1_idx` (`User_u_id` ASC) VISIBLE,
  INDEX `fk_ProductInquiry_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  CONSTRAINT `fk_ProductInquiry_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `secondhand`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProductInquiry_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `secondhand`.`Product` (`p_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `secondhand`.`Point`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`Point` (
  `point_id` INT NOT NULL AUTO_INCREMENT,
  `point_title` VARCHAR(90) NULL,
  `point_amount` INT NULL DEFAULT 0,
  `point_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `User_u_id` INT NOT NULL,
  PRIMARY KEY (`point_id`),
  INDEX `fk_Point_User1_idx` (`User_u_id` ASC) VISIBLE,
  CONSTRAINT `fk_Point_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `secondhand`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `secondhand`.`Review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secondhand`.`Review` (
  `re_id` INT NOT NULL AUTO_INCREMENT,
  `re_title` VARCHAR(90) NULL,
  `re_contents` VARCHAR(100) NOT NULL,
  `User_u_id` INT NOT NULL,
  `Product_p_id` INT NOT NULL,
  PRIMARY KEY (`re_id`),
  INDEX `fk_Review_User1_idx` (`User_u_id` ASC) VISIBLE,
  INDEX `fk_Review_Product1_idx` (`Product_p_id` ASC) VISIBLE,
  CONSTRAINT `fk_Review_User1`
    FOREIGN KEY (`User_u_id`)
    REFERENCES `secondhand`.`User` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_Product1`
    FOREIGN KEY (`Product_p_id`)
    REFERENCES `secondhand`.`Product` (`p_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
