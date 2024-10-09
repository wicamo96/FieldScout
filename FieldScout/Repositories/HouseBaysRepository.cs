using FieldScout.Models;
using FieldScout.Utils;

namespace FieldScout.Repositories
{
    public class HouseBaysRepository : BaseRepository, IHouseBaysRepository
    {
        public HouseBaysRepository(IConfiguration configuration) : base(configuration) { }

        public List<HouseBays> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, BayId, HouseId
                                        FROM HouseBays";

                    var reader = cmd.ExecuteReader();
                    var houseBays = new List<HouseBays>();

                    while (reader.Read())
                    {
                        houseBays.Add(new HouseBays()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            BayId = DbUtils.GetInt(reader, "BayId"),
                            HouseId = DbUtils.GetInt(reader, "HouseId")
                        });

                    }

                    reader.Close();

                    return houseBays;
                }
            }
        }

        public void AddBayToHouse(HouseBays houseBay)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO HouseBays (HouseId, BayId)
                                        OUTPUT INSERTED.ID                                        
                                        VALUES (@HouseId, @BayId)";
                    DbUtils.AddParameter(cmd, "@HouseId", houseBay.HouseId);
                    DbUtils.AddParameter(cmd, "@BayId", houseBay.BayId);

                    houseBay.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = @"DELETE FROM HouseBays WHERE BayId = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
