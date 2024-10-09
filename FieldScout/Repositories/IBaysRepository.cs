using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IBaysRepository
    {
        void Add(Bays bay);
        void Delete(int id);
        List<Bays> Get();
        Bays GetById(int id);
        Bays GetByName(string name);
        void Update(Bays bay);
        List<Bays> GetByHouseId(int houseId);
    }
}