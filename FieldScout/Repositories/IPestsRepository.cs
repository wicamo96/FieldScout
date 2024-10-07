using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IPestsRepository
    {
        void Add(Pests pest);
        void Delete(int id);
        List<Pests> Get();
        Pests GetById(int id);
        Pests GetByName(string name);
        void Update(Pests pest);
    }
}