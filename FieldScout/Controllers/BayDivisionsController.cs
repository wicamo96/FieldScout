using FieldScout.Models;
using FieldScout.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FieldScout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BayDivisionsController : ControllerBase
    {
        private readonly IBayDivisionRepository _bayDivisionRepository;
        public BayDivisionsController(IBayDivisionRepository bayDivisionRepository)
        {
            _bayDivisionRepository = bayDivisionRepository;
        }

        // GET: api/<BayDivisionsController>
        [HttpGet]
        public IActionResult Get()
        {
            var bayDivisions = _bayDivisionRepository.Get();
            if (bayDivisions == null)
            {
                return NotFound();
            }

            return Ok(bayDivisions);
        }

        [HttpPost("AddBayDivision")]
        public IActionResult AddBayDivision(BayDivisions bayDivision)
        {
            _bayDivisionRepository.AddBayDivision(bayDivision);
            return NoContent();
        }

        [HttpGet("GetByBayId")]
        public IActionResult GetByBayId(int bayId)
        {
            var bayDivisions = _bayDivisionRepository.GetByBayId(bayId);
            if (bayDivisions == null)
            {
                return NotFound();
            }

            return Ok(bayDivisions);
        }

        // GET api/<BayDivisionsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BayDivisionsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<BayDivisionsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, BayDivisions bayDivision)
        {
            if (id != bayDivision.Id)
            {
                return BadRequest();
            }

            _bayDivisionRepository.Update(bayDivision);
            return NoContent();
        }

        // DELETE api/<BayDivisionsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bayDivisionRepository.Delete(id);
            return NoContent();
        }
    }
}
