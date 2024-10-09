using FieldScout.Utils;
using FieldScout.Models;

namespace FieldScout.Repositories
{
    public class FacilityHousesRepository : BaseRepository, IFacilityHousesRepository
    {
        public FacilityHousesRepository(IConfiguration configuration) : base(configuration) { }

        public List<FacilityHouses> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, FacilityId, HouseId
                                        FROM FacilityHouses";

                    var reader = cmd.ExecuteReader();
                    var facilityHouses = new List<FacilityHouses>();

                    while (reader.Read())
                    {
                        facilityHouses.Add(new FacilityHouses()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FacilityId = DbUtils.GetInt(reader, "FacilityId"),
                            HouseId = DbUtils.GetInt(reader, "HouseId")
                        });

                    }

                    reader.Close();

                    return facilityHouses;
                }
            }
        }

        public void AddHouseToFacility(FacilityHouses facilityHouse)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO FacilityHouses (HouseId, FacilityId)
                                        OUTPUT INSERTED.ID                                        
                                        VALUES (@HouseId, @FacilityId)";
                    DbUtils.AddParameter(cmd, "@HouseId", facilityHouse.HouseId);
                    DbUtils.AddParameter(cmd, "@FacilityId", facilityHouse.FacilityId);

                    facilityHouse.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = @"DELETE FROM FacilityHouses WHERE HouseId = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
