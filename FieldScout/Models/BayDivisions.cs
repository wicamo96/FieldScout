namespace FieldScout.Models
{
    public class BayDivisions
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int BayId { get; set; }
        public HouseBays? HouseBay { get; set; }
        public Bays? Bay { get; set; }
        public Houses? House { get; set; }
        public ScoutingReport? ScoutingReport { get; set; }
    }
}
