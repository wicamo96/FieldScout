﻿namespace FieldScout.Models
{
    public class Facilities
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Houses> Houses { get; set; }
    } 
}
