create database if not exists rva;
use rva;

create table WorkerData
(
	id varchar(30) not null,
    password varchar(30) not null,
    firstName varchar(30) not null,
    lastName varchar(30) not null,
    role varchar(30) not null,
    facultyName varchar(30),
    studentID varchar(30),
    primary key (id)
);