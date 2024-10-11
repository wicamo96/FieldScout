﻿using FieldScout.Models;
using FieldScout.Utils;
using NuGet.Protocol.Plugins;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FieldScout.Repositories
{
    public class ScoutingReportRepository : BaseRepository, IScoutingReportRepository
    {
        public ScoutingReportRepository(IConfiguration configuration) : base(configuration) { }

        public List<ScoutingReport> Get(int facilityId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserProfileId, PestId, Pressure, BayDivisionId, Date, FacilityId, GrowingWeek
                                        FROM ScoutingReport
                                        WHERE FacilityId = @Id";

                    DbUtils.AddParameter(cmd, "Id", facilityId);

                    var reader = cmd.ExecuteReader();
                    var reports = new List<ScoutingReport>();

                    while (reader.Read())
                    {
                        reports.Add(new ScoutingReport()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PestId = DbUtils.GetInt(reader, "PestId"),
                            Pressure = DbUtils.GetString(reader, "Pressure"),
                            BayDivisionId = DbUtils.GetInt(reader, "BayDivisionId"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            FacilityId = DbUtils.GetInt(reader, "FacilityId"),
                            GrowingWeek = DbUtils.GetInt(reader, "GrowingWeek")
                        });

                    }

                    reader.Close();

                    return reports;
                }
            }
        }

        public void Add(ScoutingReport scoutingReport)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO ScoutingReport (UserProfileId, PestId, Pressure, BayDivisionId, Date, FacilityId, GrowingWeek)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @PestId, @Pressure, @BayDivisionId, @Date, @FacilityId, @GrowingWeek)";

                    DbUtils.AddParameter(cmd, "UserProfileId", scoutingReport.UserProfileId);
                    DbUtils.AddParameter(cmd, "PestId", scoutingReport.PestId);
                    DbUtils.AddParameter(cmd, "Pressure", scoutingReport.Pressure);
                    DbUtils.AddParameter(cmd, "BayDivisionId", scoutingReport.BayDivisionId);
                    DbUtils.AddParameter(cmd, "FacilityId", scoutingReport.FacilityId);
                    DbUtils.AddParameter(cmd, "Date", scoutingReport.Date);
                    DbUtils.AddParameter(cmd, "GrowingWeek", scoutingReport.GrowingWeek);

                    scoutingReport.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(ScoutingReport scoutingReport)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE ScoutingReport
                                        SET Pressure = @Pressure
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Pressure", scoutingReport.Pressure);
                    DbUtils.AddParameter(cmd, "Id", scoutingReport.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM ScoutingReport WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public ScoutingReport GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserProfileId, PestId, Pressure, BayDivisionId, Date, FacilityId, GrowingWeek
                                        FROM ScoutingReport
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    ScoutingReport report = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        report = new ScoutingReport()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PestId = DbUtils.GetInt(reader, "PestId"),
                            Pressure = DbUtils.GetString(reader, "Pressure"),
                            BayDivisionId = DbUtils.GetInt(reader, "BayDivisionId"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            FacilityId = DbUtils.GetInt(reader, "FacilityId"),
                            GrowingWeek = DbUtils.GetInt(reader, "GrowingWeek")
                        };
                    }

                    reader.Close();

                    return report;
                }
            }
        }
    }
}
