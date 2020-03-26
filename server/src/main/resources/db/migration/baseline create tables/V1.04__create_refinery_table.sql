CREATE TABLE [CTREF].[refinery](
	[id] nvarchar(36) primary key,
	[location] [varchar](255) NULL,
	[owner] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[region_id] nvarchar(36) NULL,
	[comments] [varchar](4095) NULL,
	[latitude] numeric(18,13) NULL,
	[longitude] numeric(18,13) NULL,
	[version] [int] NOT NULL,
	[updated_date_time] [datetime] NOT NULL,
	[updated_by] [nvarchar](255) NOT NULL)
GO

ALTER TABLE [CTREF].[refinery]  WITH CHECK ADD  CONSTRAINT [FK_refinery_region] FOREIGN KEY([region_id])
REFERENCES [CTREF].[region] ([id])
GO

ALTER TABLE [CTREF].[refinery] CHECK CONSTRAINT [FK_refinery_region]
GO