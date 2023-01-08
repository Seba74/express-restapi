CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE
    employee (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(40) DEFAULT NULL,
        salary INT(6) DEFAULT NULL,
        PRIMARY KEY (id)
    )
DESCRIBE employee;

INSERT INTO employee
VALUES (1, 'Joe', 10000), (2, 'Laura', 12000), (3, 'Maria', 13000), (4, 'Juan', 13000), (5, 'Alejandro', 130000)