using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> Get();
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        void Update(UserProfile userProfile);
        void Delete(int id);
        UserProfile GetById(int id);
    }
}