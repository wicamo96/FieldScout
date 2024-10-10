using FieldScout.Repositories;
using Microsoft.AspNetCore.Mvc;
using FieldScout.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FieldScout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HouseBaysController : ControllerBase
    {
        private readonly IHouseBaysRepository _houseBaysRepository;
        public HouseBaysController(IHouseBaysRepository houseBaysRepository)
        {
            _houseBaysRepository = houseBaysRepository;
        }
        // GET: api/<HouseBaysController>
        [HttpGet]
        public IActionResult Get()
        {
            var houseBays = _houseBaysRepository.Get();
            if (houseBays == null)
            {
                return NotFound();
            }

            return Ok(houseBays);
        }

        [HttpPost("AddBayToHouse")]
        public IActionResult AddBayToHouse(HouseBays houseBay)
        {
            _houseBaysRepository.AddBayToHouse(houseBay);
            return NoContent();
        }

        // GET api/<HouseBaysController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<HouseBaysController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<HouseBaysController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<HouseBaysController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _houseBaysRepository.Delete(id);
            return NoContent();
        }
    }
}
