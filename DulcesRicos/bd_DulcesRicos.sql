USE [master]
GO
/****** Object:  Database [DulcesRicos ]    Script Date: 23/09/2024 7:31:43 p. m. ******/
CREATE DATABASE [DulcesRicos ]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DulcesRicos (1)_Data', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\DulcesRicos (1).mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'DulcesRicos (1)_Log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\DulcesRicos (1).ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [DulcesRicos ] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DulcesRicos ].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DulcesRicos ] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DulcesRicos ] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DulcesRicos ] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DulcesRicos ] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DulcesRicos ] SET ARITHABORT OFF 
GO
ALTER DATABASE [DulcesRicos ] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DulcesRicos ] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DulcesRicos ] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DulcesRicos ] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DulcesRicos ] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DulcesRicos ] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DulcesRicos ] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DulcesRicos ] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DulcesRicos ] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DulcesRicos ] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DulcesRicos ] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DulcesRicos ] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DulcesRicos ] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DulcesRicos ] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DulcesRicos ] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DulcesRicos ] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DulcesRicos ] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DulcesRicos ] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DulcesRicos ] SET  MULTI_USER 
GO
ALTER DATABASE [DulcesRicos ] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DulcesRicos ] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DulcesRicos ] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DulcesRicos ] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DulcesRicos ] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DulcesRicos ] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [DulcesRicos ] SET QUERY_STORE = OFF
GO
USE [DulcesRicos ]
GO
/****** Object:  Table [dbo].[CarritoItems]    Script Date: 23/09/2024 7:31:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarritoItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductoId] [int] NULL,
	[Cantidad] [int] NULL,
	[UsuarioId] [nvarchar](128) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 23/09/2024 7:31:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productos](
	[ProductoId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NULL,
	[Precio] [decimal](10, 2) NULL,
	[Stock] [int] NULL,
	[Imagen] [nvarchar](50) NULL,
	[Descripcion] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ProductoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 23/09/2024 7:31:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[UsuarioId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NULL,
	[CorreoElectronico] [nvarchar](255) NULL,
	[Contrasena] [nvarchar](255) NULL,
	[EsAdministrador] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[UsuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CarritoItems] ON 

INSERT [dbo].[CarritoItems] ([Id], [ProductoId], [Cantidad], [UsuarioId]) VALUES (2080, 9, 9, NULL)
INSERT [dbo].[CarritoItems] ([Id], [ProductoId], [Cantidad], [UsuarioId]) VALUES (2083, 12, 5, NULL)
INSERT [dbo].[CarritoItems] ([Id], [ProductoId], [Cantidad], [UsuarioId]) VALUES (2085, 11, 1, NULL)
INSERT [dbo].[CarritoItems] ([Id], [ProductoId], [Cantidad], [UsuarioId]) VALUES (2088, 10, 1, NULL)
SET IDENTITY_INSERT [dbo].[CarritoItems] OFF
GO
SET IDENTITY_INSERT [dbo].[Productos] ON 

INSERT [dbo].[Productos] ([ProductoId], [Nombre], [Precio], [Stock], [Imagen], [Descripcion]) VALUES (8, N'HAMBURGUESA🙀🍔', CAST(15000.00 AS Decimal(10, 2)), 27, N'hamburguesa.jpeg', N'Saborea nuestra hamburguesa clásica, con una jugosa carne de res a la parrilla, acompañada de lechuga fresca, tomate maduro, cebolla crujiente y pepinillos, todo envuelto en un pan suave y dorado. ¡Una opción perfecta para una comida rápida y deliciosa!')
INSERT [dbo].[Productos] ([ProductoId], [Nombre], [Precio], [Stock], [Imagen], [Descripcion]) VALUES (9, N'PIZZA DOBLE QUESO 🤪🍕', CAST(20000.00 AS Decimal(10, 2)), 27, N'PIZZA.JPEG', N'Sumérgete en la deliciosa simplicidad de nuestra pizza de queso, con una base crujiente y dorada, cubierta con una generosa capa de queso mozzarella fundido. Perfecta para los amantes del queso que buscan una experiencia clásica y reconfortante.')
INSERT [dbo].[Productos] ([ProductoId], [Nombre], [Precio], [Stock], [Imagen], [Descripcion]) VALUES (10, N'SANDWICH DE POLLO 🥴🥪', CAST(18000.00 AS Decimal(10, 2)), 20, N'POLLO.JPEG', N'sándwich de pollo, preparado con jugosas pechugas de pollo a la parrilla, acompañadas de lechuga fresca, tomate maduro y una cremosa mayonesa, todo envuelto en un pan crujiente y dorado. ¡Perfecto para una comida rápida y sabrosa!')
INSERT [dbo].[Productos] ([ProductoId], [Nombre], [Precio], [Stock], [Imagen], [Descripcion]) VALUES (11, N'PERRO CALIENTE 😏🌭', CAST(22500.00 AS Decimal(10, 2)), 75, N'PERRO1.JPEG', N'Disfruta de nuestro delicioso perro caliente, con una salchicha jugosa y bien cocida, acompañada de cebolla, tomate, mostaza y ketchup, todo envuelto en un pan suave y esponjoso. Completa tu experiencia con una refrescante Coca-Cola bien fría. ¡La combinación perfecta para una comida rápida y satisfactoria!')
INSERT [dbo].[Productos] ([ProductoId], [Nombre], [Precio], [Stock], [Imagen], [Descripcion]) VALUES (12, N'EMPANADAS (CARNE, POLLO,QUESO )😮🥟', CAST(3000.00 AS Decimal(10, 2)), 34, N'EMPANADA.JPEG', N'Descubre nuestras empanadas, una explosión de sabor en cada bocado. Preparadas con una masa crujiente y dorada, nuestras empanadas están rellenas con ingredientes frescos y de alta calidad. Cada empanada es una obra maestra culinaria, perfecta para cualquier ocasión. tenemos de (carne pollo queso )')
INSERT [dbo].[Productos] ([ProductoId], [Nombre], [Precio], [Stock], [Imagen], [Descripcion]) VALUES (14, N'SUPER SALCHIPAPAS 🍟🤤', CAST(45000.00 AS Decimal(10, 2)), 10, N'SALCHICHA.JPEG', N'“¡Disfruta del placer supremo con nuestra creación culinaria! Salchichas jugosas con mayonesa y kétchup, acompañadas de papas fritas crujientes, tomate cherry fresco y carne sazonada. Una experiencia de sabor única que querrás repetir. ¡Date el gusto que mereces!”🤤🥴')
SET IDENTITY_INSERT [dbo].[Productos] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([UsuarioId], [Nombre], [CorreoElectronico], [Contrasena], [EsAdministrador]) VALUES (1, N'Andrés', N'andresbrrchn@ucundinamarca.edu.co', N'12345', 1)
INSERT [dbo].[Usuarios] ([UsuarioId], [Nombre], [CorreoElectronico], [Contrasena], [EsAdministrador]) VALUES (2, N'Dylan', N'ebvt@ertvt', N'holamundo', 0)
INSERT [dbo].[Usuarios] ([UsuarioId], [Nombre], [CorreoElectronico], [Contrasena], [EsAdministrador]) VALUES (3, N'Jacinta', N'jaja@gmail.com', N'111', 0)
INSERT [dbo].[Usuarios] ([UsuarioId], [Nombre], [CorreoElectronico], [Contrasena], [EsAdministrador]) VALUES (4, N'Fredo', N'fifa@gmail.com', N'000', 0)
INSERT [dbo].[Usuarios] ([UsuarioId], [Nombre], [CorreoElectronico], [Contrasena], [EsAdministrador]) VALUES (5, N'Juan', N'jua@123', N'101', 1)
INSERT [dbo].[Usuarios] ([UsuarioId], [Nombre], [CorreoElectronico], [Contrasena], [EsAdministrador]) VALUES (6, N'ANDRES DIAZ', N'andres12@gmail.com', N'00000', 0)
INSERT [dbo].[Usuarios] ([UsuarioId], [Nombre], [CorreoElectronico], [Contrasena], [EsAdministrador]) VALUES (1006, N'katerine', N'katerine@gmail.com', N'11111', 1)
INSERT [dbo].[Usuarios] ([UsuarioId], [Nombre], [CorreoElectronico], [Contrasena], [EsAdministrador]) VALUES (1007, N'yohan', N'yohan@gmail.com', N'00000', 0)
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Usuarios__531402F3BE1455F5]    Script Date: 23/09/2024 7:31:44 p. m. ******/
ALTER TABLE [dbo].[Usuarios] ADD UNIQUE NONCLUSTERED 
(
	[CorreoElectronico] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Productos] ADD  CONSTRAINT [DF_Descripcion]  DEFAULT ('Default Value') FOR [Descripcion]
GO
ALTER TABLE [dbo].[CarritoItems]  WITH CHECK ADD FOREIGN KEY([ProductoId])
REFERENCES [dbo].[Productos] ([ProductoId])
GO
USE [master]
GO
ALTER DATABASE [DulcesRicos ] SET  READ_WRITE 
GO
