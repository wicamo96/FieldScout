using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IScoutingReportRepository
    {
        void Add(ScoutingReport scoutingReport);
        void Delete(int id);
        List<ScoutingReport> Get(int facilityId);
        void Update(ScoutingReport scoutingReport);
        ScoutingReport GetById(int id);
    }
}