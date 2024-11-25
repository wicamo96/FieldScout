using FieldScout.Models;
using FieldScout.Utils;

namespace FieldScout.Repositories
{
    public class BayDivisionRepository : BaseRepository, IBayDivisionRepository
    {
        public BayDivisionRepository(IConfiguration configuration) : base(configuration) { }
        public List<BayDivisions> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, BayId
                                        FROM BayDivisions";

                    var reader = cmd.ExecuteReader();
                    List<BayDivisions> bayDivisions = new List<BayDivisions>();

                    while (reader.Read())
                    {
                        bayDivisions.Add(new BayDivisions()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            BayId = DbUtils.GetInt(reader, "BayId")
                        });

                    }

                    reader.Close();

                    return bayDivisions;
                }
            }
        }

        public void AddBayDivision(BayDivisions bayDivision)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO BayDivisions (Name, BayId)
                                        OUTPUT INSERTED.ID                                        
                                        VALUES (@Name, @BayId)";
                    DbUtils.AddParameter(cmd, "@Name", bayDivision.Name);
                    DbUtils.AddParameter(cmd, "@BayId", bayDivision.BayId);

                    bayDivision.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(BayDivisions bayDivision)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE BayDivisions
                                        SET Name = @Name
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "Name", bayDivision.Name);
                    DbUtils.AddParameter(cmd, "Id", bayDivision.Id);

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
                    cmd.CommandText = @"DELETE FROM BayDivisions WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<BayDivisions> GetByBayId(int bayId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, BayId
                                        FROM BayDivisions
                                        WHERE BayId = @Id";

                    DbUtils.AddParameter(cmd, "Id", bayId);

                    var reader = cmd.ExecuteReader();
                    List<BayDivisions> bayDivisions = new List<BayDivisions>();

                    while (reader.Read())
                    {
                        bayDivisions.Add(new BayDivisions()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            BayId = DbUtils.GetInt(reader, "BayId")
                        });

                    }

                    reader.Close();

                    return bayDivisions;
                }
            }
        }

        public List<BayDivisions> GetByHouseIdWithScoutingReport(int houseId, int growingWeek, int pestId) 
        { 
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT h.Name AS HouseName, hb.HouseId, hb.BayId AS BayId, hb.Id AS HouseBayId, b.Name AS BayName, bd.Id AS BayDivisionId, bd.Name AS BayDivisionName";

                    if (growingWeek != 0 && pestId != 0)
                    {
                        cmd.CommandText += @", sr.Pressure 
                                            FROM HouseBays hb
                                            LEFT JOIN Bays b ON b.Id = hb.BayId
                                            LEFT JOIN BayDivisions bd ON bd.BayId = b.Id
                                            LEFT JOIN Houses h ON h.Id = hb.HouseId
                                            LEFT JOIN ScoutingReport sr ON sr.BayDivisionId = bd.Id
                                            WHERE hb.HouseId = @HouseId AND sr.GrowingWeek = @GrowingWeek AND sr.PestId = @PestId";


                        DbUtils.AddParameter(cmd, "GrowingWeek", growingWeek);
                        DbUtils.AddParameter(cmd, "PestId", pestId);
                    }
                    else
                    {
                        cmd.CommandText += @"FROM HouseBays hb
                                            LEFT JOIN Bays b ON b.Id = hb.BayId
                                            LEFT JOIN BayDivisions bd ON bd.BayId = b.Id
                                            LEFT JOIN Houses h ON h.Id = hb.HouseId
                                            LEFT JOIN ScoutingReport sr ON sr.BayDivisionId = bd.Id
                                            WHERE hb.HouseId = @HouseId";
                    }

                    DbUtils.AddParameter(cmd, "HouseId", houseId);

                    var reader = cmd.ExecuteReader();

                    List<BayDivisions> divisions = new List<BayDivisions>();

                    while (reader.Read())
                    {
                        divisions.Add(new BayDivisions()
                        {
                            Id = DbUtils.GetInt(reader, "BayDivisionId"),
                            Name = DbUtils.GetString(reader, "BayDivisionName"),
                            BayId = DbUtils.GetInt(reader, "BayId"),
                            HouseBay = new HouseBays()
                            {
                                HouseId = DbUtils.GetInt(reader, "HouseId"),
                                BayId = DbUtils.GetInt(reader, "BayId"),
                                Id = DbUtils.GetInt(reader, "HouseBayId")
                            },
                            Bay = new Bays()
                            {
                                Name = DbUtils.GetString(reader, "BayName"),
                                Id = DbUtils.GetInt(reader, "BayId")
                            },
                            House = new Houses()
                            {
                                Name = DbUtils.GetString(reader, "HouseName")
                            },
                            ScoutingReport = new ScoutingReport()
                            {
                                Pressure = DbUtils.GetString(reader, "Pressure")
                            }
                        });
                    }

                    reader.Close();

                    return divisions;
                }
            }
        }
    }
}
