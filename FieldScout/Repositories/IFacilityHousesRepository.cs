using FieldScout.Models;

namespace FieldScout.Repositories
{
    public interface IFacilityHousesRepository
    {
        List<FacilityHouses> Get();
        void AddHouseToFacility(FacilityHouses facilityHouse);
        void Delete(int id);
    }
}