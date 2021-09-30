create database ContactFormDB

use ContactFormDB

create table dbo.Contactform(
	CF_ID int identity(1,1),
	CF_FirstName varchar(30),
	CF_LastName varchar(30),
	CF_Email varchar(100),
	CF_Subject varchar(100),
	CF_Message varchar(500)
)

drop table dbo.Contactform

select * from dbo.Contactform

insert into dbo.Contactform values ('Diell', 'Gashi', 'diellgashi@gmail.com', 'Random Subject', 'Lorem Ipsum dolor')
