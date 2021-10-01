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

create table dbo.Bugtypes(
	BugID int identity(1,1),
	BugType varchar(100)
)

create table dbo.ReportABug(
	ReportID int identity(1,1),
	ReportName varchar(100),
	ReportBugType varchar(100),
	ReportDescription varchar(500)	
)	

create table dbo.Rating(
	RatingID int identity(1,1),
	RatingDescription varchar(100)
)

create table dbo.Review(
	ReviewID int identity(1,1),
	ReviewName varchar(100),
	ReviewRating varchar(100),
	ReviewMessage varchar(500)
)


select * from dbo.Contactform

select * from dbo.Bugtypes

select * from dbo.ReportABug

insert into dbo.Contactform values ('Diell', 'Gashi', 'diellgashi@gmail.com', 'Random Subject', 'Lorem Ipsum dolor')

insert into dbo.ReportABug values ('Altin Salihu', 'The menu is not showing items', 'Testing' )

insert into dbo.Bugtypes values ('The menu is not showing items')

insert into dbo.Bugtypes values ('I have no access to a specific page ')

insert into dbo.Bugtypes values ('I cannot change my credencials')

insert into dbo.Bugtypes values ('The contents of a page is not showing')

insert into dbo.Bugtypes values ('Misc/Other')

insert into dbo.Rating values ('1 - Horrible')
insert into dbo.Rating values ('2 - Bad')
insert into dbo.Rating values ('3 - Mediocre')
insert into dbo.Rating values ('4 - Good')
insert into dbo.Rating values ('5 - Excellent')

insert into dbo.Review values ('Diell Gashi', '5 - Excellent', 'Lorem Ipsum Dolor')

select * from dbo.Rating
select * from dbo.Review