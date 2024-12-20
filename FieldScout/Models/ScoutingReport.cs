﻿namespace FieldScout.Models
{
    public class ScoutingReport
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int PestId { get; set; }
        public string Pressure { get; set; }
        public int BayDivisionId { get; set; }
        public DateTime Date { get; set; }
        public int FacilityId { get; set; }
        public int GrowingWeek { get; set; }
        public Bays? Bay { get; set; }
        public Houses? House { get; set; }

    }
}
