using FieldScout.Repositories;
using Microsoft.AspNetCore.Mvc;
using FieldScout.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FieldScout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacilitiesController : ControllerBase
    {
        private readonly IFacilitiesRepository _facilitiesRepository;
        private readonly IHousesRepository _housesRepository;
        public FacilitiesController(IFacilitiesRepository facilitiesRepository, IHousesRepository housesRepository)
        {
            _facilitiesRepository = facilitiesRepository;
            _housesRepository = housesRepository;
        }
        // GET: api/<FacilitiesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_facilitiesRepository.Get());
        }

        // GET api/<FacilitiesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var facility = _facilitiesRepository.GetById(id);
            if (facility == null)
            {
                return NotFound();
            }
            return Ok(facility);
        }

        [HttpGet("GetByName")]
        public IActionResult GetByName(string name)
        {
            var facility = _facilitiesRepository.GetByName(name);
            if (name == null || facility == null)
            {
                return NotFound();
            }

            return Ok(facility);
        }

        [HttpGet("GetByIdWithHouses")]
        public IActionResult GetByIdWithHouses(int facilityId)
        {
            var facility = _facilitiesRepository.GetById(facilityId);
            if (facility == null)
            {
                return NotFound();
            }

            var houses = _housesRepository.GetByFacilityId(facilityId);
            if (houses == null)
            {
                return NotFound();
            }

            facility.Houses = new List<Houses>();

            houses.ForEach(house => facility.Houses.Add(house));
            return Ok(facility);
        }

        // POST api/<FacilitiesController>
        [HttpPost]
        public IActionResult Post(Facilities facility)
        {
            _facilitiesRepository.Add(facility);
            return CreatedAtAction(
                "GetByName",
                new { name = facility.Name },
                facility);
        }

        // PUT api/<FacilitiesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Facilities facility)
        {
            if (id != facility.Id)
            {
                return BadRequest();
            }

            _facilitiesRepository.Update(facility);
            return NoContent();
        }

        // DELETE api/<FacilitiesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _facilitiesRepository.Delete(id);
            return NoContent();
        }
    }
}
