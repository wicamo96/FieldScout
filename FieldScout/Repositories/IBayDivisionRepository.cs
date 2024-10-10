using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IBayDivisionRepository
    {
        void AddBayDivision(BayDivisions bayDivision);
        void Update(BayDivisions bayDivision);
        void Delete(int id);
        List<BayDivisions> Get();
        List<BayDivisions> GetByBayId(int bayId);
    }
}