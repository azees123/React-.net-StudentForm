create database Student
use Student


create table student(Sid int primary key IDENTITY(1,2),
name varchar(50),dob date,gender char(1),email varchar(50),number int)

select * from student