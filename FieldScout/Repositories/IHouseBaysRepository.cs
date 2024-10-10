using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IHouseBaysRepository
    {
        void AddBayToHouse(HouseBays houseBay);
        void Delete(int id);
        List<HouseBays> Get();
    }
}