CREATE NONCLUSTERED INDEX analysis_grade_id_idx ON CTREF.analysis (grade_id) INCLUDE (api, sulphur, from_date, to_date, reference, country_id, version, updated_by, updated_date_time) WITH (ONLINE = ON);