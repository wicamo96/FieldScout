using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IHousesRepository
    {
        void Add(Houses house);
        void Delete(int id);
        List<Houses> Get();
        Houses GetById(int id);
        Houses GetByName(string name);
        void Update(Houses house);
    }
}