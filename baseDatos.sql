drop database prueba;
create database prueba;
use prueba;
create table estado(id tinyint unsigned auto_increment primary key, nombre_estado varchar(255)not null);
INSERT INTO estado (nombre_estado) VALUES 
    ('activo'), 
    ('inactivo');
create table rol(id tinyint unsigned auto_increment primary key, nombre_rol varchar(255)not null);
INSERT INTO rol (nombre_rol) VALUES 
    ('administrador'), 
    ('Lider de proyecto'), 
    ('desarrollador');
create table usuario (id smallint unsigned auto_increment primary key, 
nombre varchar(255)not null,
apellido varchar(255)not null, 
fecha_nacimiento date not null,
correo varchar(255) not null,
contrasena varchar(255)not null ,
documento bigint unsigned not null,
direccion varchar(255) not null,
profesion varchar(255)not null, 
especialidad_desarrollo varchar(255) not null, 
rol tinyint unsigned not null
,foreign key (rol) references rol(id), 
estado tinyint unsigned not null,
foreign key (estado) references estado(id) );

create table estado_proyecto (
id smallint unsigned auto_increment primary key, 
nombre_estado_proyecto varchar(255)not null);

insert into estado_proyecto (nombre_estado_proyecto) values ("en espera"), ("en progreso"), ("finalizado con exito"), ("finalizado con problemas") ,("desactivado");
create table proyecto(
id smallint unsigned auto_increment primary key, 
nombre_proyecto varchar(255) not null,
descripcion_proyecto varchar(255)not null,
estado tinyint unsigned not null, foreign key (estado) references estado(id),
estado_proyecto smallint unsigned not null,
foreign key (estado_proyecto) references estado_proyecto(id), 
dia_inicio date not null,
dia_fin date not null );

create table usuario_proyecto(
id tinyint unsigned auto_increment primary key,
id_usuario smallint unsigned not null,
id_proyecto smallint unsigned not null,
foreign key (id_usuario) references usuario(id),
foreign key (id_proyecto) references proyecto(id)
);
create table etapa(
id tinyint unsigned auto_increment primary key, 
nombre_etapa varchar(255)not null, 
descripcion_etapa varchar(255),
estado tinyint unsigned not null,
foreign key (estado) references estado(id));

create table etapa_proyecto (id smallint unsigned auto_increment primary key, 
id_proyecto smallint unsigned not null, 
id_etapa tinyint unsigned not null,
fecha_inicio date not null,
fecha_fin date not null
,foreign key (id_proyecto) references proyecto(id)
,foreign key (id_etapa) references etapa(id));

create table actividad(
id tinyint unsigned auto_increment primary key, 
nombre_actividad varchar(255) not null);

create table etapa_actividad(
id tinyint unsigned auto_increment primary key,
id_etapa smallint unsigned
);

create table usuario_actividad(
id tinyint unsigned auto_increment primary key,
id_desarrollador smallint unsigned not null,
id_actividad tinyint unsigned not null,
ejecucion varchar(255)not null default"en proceso",
foreign key (id_desarrollador) references usuario_proyecto(id_usuario),
foreign key (id_actividad) references actividad_etapa(id)
);

create table interrupcion(id tinyint unsigned auto_increment primary key,
tipo varchar(255)not null,id_actividad tinyint unsigned not null,fecha date not null, hora time not null,duracion varchar(255) not null, foreign key (id_actividad) references usuario_actividad(id));


