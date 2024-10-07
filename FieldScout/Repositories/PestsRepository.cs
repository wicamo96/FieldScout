using FieldScout.Models;
using FieldScout.Utils;

namespace FieldScout.Repositories
{
    public class PestsRepository : BaseRepository, IPestsRepository
    {
        public PestsRepository(IConfiguration configuration) : base(configuration) { }
        public List<Pests> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Pests";

                    var reader = cmd.ExecuteReader();
                    var pests = new List<Pests>();

                    while (reader.Read())
                    {
                        pests.Add(new Pests()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();

                    return pests;
                }
            }
        }

        public Pests GetByName(string name)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Pests
                                        WHERE Name = @Name";
                    DbUtils.AddParameter(cmd, "Name", name);

                    Pests pest = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        pest = new Pests()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return pest;
                }
            }
        }

        public void Add(Pests pest)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Pests (Name)
                                        OUTPUT INSERTED.ID                                        VALUES (@Name)";
                    DbUtils.AddParameter(cmd, "@Name", pest.Name);

                    pest.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Pests pest)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Pests
                                        SET Name = @Name
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "Name", pest.Name);
                    DbUtils.AddParameter(cmd, "Id", pest.Id);

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
                    cmd.CommandText = @"DELETE FROM Pests WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Pests GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Pests
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    Pests pest = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        pest = new Pests()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return pest;
                }
            }
        }
    }
}
