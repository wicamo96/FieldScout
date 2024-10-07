using FieldScout.Repositories;
using Microsoft.AspNetCore.Mvc;
using FieldScout.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FieldScout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaysController : ControllerBase
    {
        private readonly IBaysRepository _baysRepository;
        public BaysController(IBaysRepository baysRepository)
        {
            _baysRepository = baysRepository;
        }

        // GET: api/<BaysController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_baysRepository.Get());
        }

        // GET api/<BaysController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var bay = _baysRepository.GetById(id);
            if (bay == null)
            {
                return NotFound();
            }
            return Ok(bay);
        }

        [HttpGet("GetByName")]
        public IActionResult GetByName(string name)
        {
            var bay = _baysRepository.GetByName(name);
            if (bay == null || name == null)
            {
                return NotFound();
            }

            return Ok(bay);
        }

        // POST api/<BaysController>
        [HttpPost]
        public IActionResult Post(Bays bay)
        {
            _baysRepository.Add(bay);
            return CreatedAtAction(
                "GetByName",
                new { name = bay.Name },
                bay);
        }

        // PUT api/<BaysController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Bays bay)
        {
            if (id != bay.Id)
            {
                return BadRequest();
            }

            _baysRepository.Update(bay);
            return NoContent();
        }

        // DELETE api/<BaysController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _baysRepository.Delete(id);
            return NoContent();
        }
    }
}
