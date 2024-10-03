using FieldScout.Models;

namespace FieldScout.Repositories
{
    public class UserProfileRepository : BaseRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }
        public List<UserProfile> Get()
        { 
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, FacilityId, Name, Email
                                        FROM UserProfile";

                    var reader = cmd.ExecuteReader();
                    var profiles = new List<UserProfile>();

                    while (reader.Read())
                    {
                        profiles.Add(new UserProfile()
                        {

                        });
                    }
                }
            }
        }
    }
}
