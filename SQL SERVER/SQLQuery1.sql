create database ThreeTierDB
use ThreeTierDB

create table tblCourse(Cid int primary key identity(1,1), CourseName varchar(30))

insert tblCourse values('BCA'),('B.Tech'),('MBA'),('MCA'),('M.Tech')
select * from tblCourse


create table tblStudent(Sid int primary key identity(101,1), Name varchar(30), Email varchar(50), Fee money, CourseId int)

create procedure spGetAllCourse
as begin
select * from tblCourse
end

create procedure spGetAllStudent
as begin
select s.SId, s.Name, s.Email, s.Fee, c.CourseName from tblStudent s, tblCourse c
where s.CourseId=c.Cid
end





