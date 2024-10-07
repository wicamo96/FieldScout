using FieldScout.Models;
using FieldScout.Utils;

namespace FieldScout.Repositories
{
    public class BaysRepository : BaseRepository, IBaysRepository
    {
        public BaysRepository(IConfiguration configuration) : base(configuration) { }

        public List<Bays> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Bays";

                    var reader = cmd.ExecuteReader();
                    var bays = new List<Bays>();

                    while (reader.Read())
                    {
                        bays.Add(new Bays()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();

                    return bays;
                }
            }
        }

        public Bays GetByName(string name)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Bays
                                        WHERE Name = @Name";
                    DbUtils.AddParameter(cmd, "Name", name);

                    Bays bay = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        bay = new Bays()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return bay;
                }
            }
        }

        public void Add(Bays bay)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Bays (Name)
                                        OUTPUT INSERTED.ID                                        VALUES (@Name)";
                    DbUtils.AddParameter(cmd, "@Name", bay.Name);

                    bay.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Bays bay)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Bays
                                        SET Name = @Name
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "Name", bay.Name);
                    DbUtils.AddParameter(cmd, "Id", bay.Id);

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
                    cmd.CommandText = @"DELETE FROM Bays WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Bays GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Bays
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    Bays bay = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        bay = new Bays()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return bay;
                }
            }
        }
    }
}
