using FieldScout.Repositories;
using Microsoft.AspNetCore.Mvc;
using FieldScout.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FieldScout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacilityHousesController : ControllerBase
    {
        private readonly IFacilityHousesRepository _facilityHousesRepository;
        public FacilityHousesController(IFacilityHousesRepository facilityHousesRepository)
        {
            _facilityHousesRepository = facilityHousesRepository;
        }
        // GET: api/<FacilityHousesController>
        [HttpGet]
        public IActionResult Get()
        {
            var facilityHouses = _facilityHousesRepository.Get();
            if (facilityHouses == null)
            {
                return NotFound();
            }
            
            return Ok(facilityHouses);
        }

        [HttpPost("AddHouseToFacility")]
        public IActionResult AddHouseToFacility(FacilityHouses facilityHouse)
        {
            _facilityHousesRepository.AddHouseToFacility(facilityHouse);
            return NoContent();
        }

        // GET api/<FacilityHousesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FacilityHousesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<FacilityHousesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FacilityHousesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _facilityHousesRepository.Delete(id);
            return NoContent();
        }
    }
}
