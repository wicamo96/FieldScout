using FieldScout.Repositories;
using Microsoft.AspNetCore.Mvc;
using FieldScout.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FieldScout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PestsController : ControllerBase
    {
        private readonly IPestsRepository _pestsRepository;
        public PestsController(IPestsRepository pestsRepository)
        {
            _pestsRepository = pestsRepository;
        }

        // GET: api/<PestsController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_pestsRepository.Get());
        }

        // GET api/<PestsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var pest = _pestsRepository.GetById(id);
            if (pest == null)
            {
                return NotFound();
            }

            return Ok(pest);
        }

        [HttpGet("GetByName")]
        public IActionResult GetByName(string name)
        {
            var pest = _pestsRepository.GetByName(name);

            if (pest == null || name == null)
            {
                return NotFound();
            }

            return Ok(pest);
        }

        // POST api/<PestsController>
        [HttpPost]
        public IActionResult Post(Pests pest)
        {
            _pestsRepository.Add(pest);
            return CreatedAtAction(
                "GetByName",
                new { name = pest.Name },
                pest);
        }

        // PUT api/<PestsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Pests pest)
        {
            if (id != pest.Id)
            {
                return BadRequest();
            }

            _pestsRepository.Update(pest);
            return NoContent();
        }

        // DELETE api/<PestsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _pestsRepository.Delete(id);
            return NoContent();
        }
    }
}
