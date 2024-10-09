using FieldScout.Models;
using FieldScout.Utils;

namespace FieldScout.Repositories
{
    public class HousesRepository : BaseRepository, IHousesRepository
    {
        public HousesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Houses> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Houses";

                    var reader = cmd.ExecuteReader();
                    var houses = new List<Houses>();

                    while (reader.Read())
                    {
                        houses.Add(new Houses()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();

                    return houses;
                }
            }
        }

        public Houses GetByName(string name)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Houses
                                        WHERE Name = @Name";
                    DbUtils.AddParameter(cmd, "Name", name);

                    Houses house = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        house = new Houses()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return house;
                }
            }
        }

        public void Add(Houses house)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Houses (Name)
                                        OUTPUT INSERTED.ID                                        
                                        VALUES (@Name)";
                    DbUtils.AddParameter(cmd, "@Name", house.Name);

                    house.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Houses house)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Houses
                                        SET Name = @Name
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "Name", house.Name);
                    DbUtils.AddParameter(cmd, "Id", house.Id);

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
                    cmd.CommandText = @"DELETE FROM Houses WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Houses GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Houses
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    Houses house = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        house = new Houses()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return house;
                }
            }
        }

        public List<Houses> GetByFacilityId(int facilityId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT h.Id AS HouseId, h.Name AS HouseName
                                        FROM Houses h
                                        LEFT JOIN FacilityHouses fh ON fh.HouseId = h.Id
                                        WHERE fh.FacilityId = @Id";

                    DbUtils.AddParameter(cmd, "Id", facilityId);

                    List<Houses> houses = new List<Houses>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        houses.Add(new Houses()
                        {
                            Id = DbUtils.GetInt(reader, "HouseId"),
                            Name = DbUtils.GetString(reader, "HouseName")
                        });
                    }

                    reader.Close();

                    return houses;
                }
            }           
        }
    }
}
