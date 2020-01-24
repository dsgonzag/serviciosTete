CREATE TABLE usuario(
id serial NOT NULL,
nombre varchar(255),
mail varchar(255),
nom_user varchar(255),
pass varchar(255),
PRIMARY KEY (id)
);

INSERT INTO usuario ( nombre,mail, nom_user, pass) VALUES
(1,'Diana Gonzaga','dsgonzag@espol.edu.ec','dsgonzag','123456');
INSERT INTO usuario ( nombre,mail, nom_user, pass) VALUES
(2,'Charlie Mite','cdmite@espol.edu.ec','cdmite','123456');


