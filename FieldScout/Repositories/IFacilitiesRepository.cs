using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IFacilitiesRepository
    {
        void Add(Facilities facility);
        void Delete(int id);
        List<Facilities> Get();
        Facilities GetById(int id);
        Facilities GetByName(string name);
        void Update(Facilities facility);
    }
}