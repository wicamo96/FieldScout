using Microsoft.AspNetCore.Mvc;
using FieldScout.Repositories;
using FieldScout.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FieldScout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HousesController : ControllerBase
    {
        private readonly IHousesRepository _housesRepository;
        public HousesController(IHousesRepository housesRepository)
        {
            _housesRepository = housesRepository;
        }

        // GET: api/<HousesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_housesRepository.Get());
        }

        // GET api/<HousesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var house = _housesRepository.GetById(id);
            if (house == null)
            {
                return NotFound();
            }

            return Ok(house);
        }

        [HttpGet("GetByName")]
        public IActionResult GetByName(string name)
        {
            var house = _housesRepository.GetByName(name);

            if (house == null || name == null)
            {
                return NotFound();
            }

            return Ok(house);
        }

        // POST api/<HousesController>
        [HttpPost]
        public IActionResult Post(Houses house)
        {
            _housesRepository.Add(house);
            return CreatedAtAction(
                "GetByName",
                new { name = house.Name },
                house);
        }

        // PUT api/<HousesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Houses house)
        {
            if (id != house.Id)
            {
                return BadRequest();
            }

            _housesRepository.Update(house);
            return NoContent();
        }

        // DELETE api/<HousesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _housesRepository.Delete(id);
            return NoContent();
        }
    }
}
