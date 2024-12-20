﻿using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IScoutingReportRepository
    {
        void Add(ScoutingReport scoutingReport);
        void Delete(int id);
        List<ScoutingReport> Get(int facilityId);
        List<int> GetGrowingWeeksByHouseId(int houseId);
        void Update(ScoutingReport scoutingReport);
        ScoutingReport GetById(int id);
        List<ScoutingReport> GetBayScoutingReportByGrowingWeek(int growingWeek, int bayDivisionId);
        List<Bays> ScoutingReportBayIds(int growingWeek, int houseId);
        List<ScoutingReport> ScoutingReportTrends(int growingWeekStart, int growingWeekEnd, int houseId, int? bayId, int? bayDivId, int pestId);

    }
}