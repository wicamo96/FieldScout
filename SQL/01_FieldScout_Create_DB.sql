USE [master]

IF db_id('FieldScout') IS NULL
  CREATE DATABASE [FieldScout]
GO

USE [FieldScout]
GO

DROP TABLE IF EXISTS [ScoutingReport];
DROP TABLE IF EXISTS [Pests];
DROP TABLE IF EXISTS [BayDivisions];
DROP TABLE IF EXISTS [HouseBays];
DROP TABLE IF EXISTS [Bays];
DROP TABLE IF EXISTS [FacilityHouses];
DROP TABLE IF EXISTS [Houses];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Facilities];
GO

CREATE TABLE [Facilities] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FacilityId] integer,
  [Name] nvarchar(255),
  [Email] nvarchar(255)
)
GO

CREATE TABLE [Houses] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [FacilityHouses] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FacilityId] integer,
  [HouseId] integer
)
GO

CREATE TABLE [Bays] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [HouseBays] (
  [Id] integer PRIMARY KEY IDENTITY,
  [BayId] integer,
  [HouseId] integer
)
GO

CREATE TABLE [BayDivisions] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255),
  [BayId] integer
)
GO

CREATE TABLE [Pests] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [ScoutingReport] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer,
  [PestId] integer,
  [Pressure] nvarchar(255),
  [BayDivisionId] integer,
  [Date] datetime,
  [FacilityId] integer
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([FacilityId]) REFERENCES [Facilities] ([Id])
GO

ALTER TABLE [ScoutingReport] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [ScoutingReport] ADD FOREIGN KEY ([PestId]) REFERENCES [Pests] ([Id])
GO

ALTER TABLE [ScoutingReport] ADD FOREIGN KEY ([BayDivisionId]) REFERENCES [BayDivisions] ([Id])
GO

ALTER TABLE [ScoutingReport] ADD FOREIGN KEY ([FacilityId]) REFERENCES [Facilities] ([Id])
GO

ALTER TABLE [BayDivisions] ADD FOREIGN KEY ([BayId]) REFERENCES [Bays] ([Id])
GO

ALTER TABLE [HouseBays] ADD FOREIGN KEY ([BayId]) REFERENCES [Bays] ([Id])
GO

ALTER TABLE [HouseBays] ADD FOREIGN KEY ([HouseId]) REFERENCES [Houses] ([Id])
GO

ALTER TABLE [FacilityHouses] ADD FOREIGN KEY ([HouseId]) REFERENCES [Houses] ([Id])
GO

ALTER TABLE [FacilityHouses] ADD FOREIGN KEY ([FacilityId]) REFERENCES [Facilities] ([Id])
GO
