using FieldScout.Models;
using FieldScout.Utils;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using NuGet.Protocol.Plugins;

namespace FieldScout.Repositories
    
{
    public class FacilitiesRepository : BaseRepository, IFacilitiesRepository
    {
        public FacilitiesRepository(IConfiguration configuration) : base(configuration) { }
        public List<Facilities> Get()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Facilities";

                    var reader = cmd.ExecuteReader();
                    var facilities = new List<Facilities>();

                    while (reader.Read())
                    {
                        facilities.Add(new Facilities()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();

                    return facilities;
                }
            }
        }

        public Facilities GetByName(string name)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Facilities
                                        WHERE Name = @Name";
                    DbUtils.AddParameter(cmd, "Name", name);

                    Facilities facility = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        facility = new Facilities()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return facility;
                }
            }
        }

        public void Add(Facilities facility)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Facilities (Name)
                                        OUTPUT INSERTED.ID                                        
                                        VALUES (@Name)";
                    DbUtils.AddParameter(cmd, "@Name", facility.Name);

                    facility.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Facilities facility)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Facilities
                                        SET Name = @Name,
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "Name", facility.Name);
                    DbUtils.AddParameter(cmd, "Id", facility.Id);

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
                    cmd.CommandText = @"DELETE FROM Facilities WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Facilities GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Facilities
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "Id", id);

                    Facilities facility = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        facility = new Facilities()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return facility;
                }
            }
        }
    }
}
