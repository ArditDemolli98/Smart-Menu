use userDB


create table Categories(
    CategoryID int identity(1,1) Primary Key,
    UserID int,
    CategoryName varchar(255),

    foreign key (UserID) references Accounts(Id)
)

create table Products(
    ProductID int identity(1,1) Primary Key,
    ProductName varchar(255),
    ProductDescription varchar(255),
    Price money,
    CategoryID int,
    PhotoFileName varchar(255),

    foreign key (CategoryID) references Categories(CategoryID)
)