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
    }
}
