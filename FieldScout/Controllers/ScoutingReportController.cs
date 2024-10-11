using FieldScout.Models;
using FieldScout.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Globalization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FieldScout.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoutingReportController : ControllerBase
    {
        private readonly IScoutingReportRepository _scoutingReportRepository;
        public ScoutingReportController(IScoutingReportRepository scoutingReportRepository)
        {
            _scoutingReportRepository = scoutingReportRepository;
        }
        // GET: api/<ScoutingReportController>
        [HttpGet]
        public IActionResult Get(int facilityId)
        {
            var reports = _scoutingReportRepository.Get(facilityId);
            if (reports == null)
            {
                return NotFound();
            }
            return Ok(reports);
        }

        // GET api/<ScoutingReportController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var report = _scoutingReportRepository.GetById(id);
            if (report == null)
            {
                return NotFound();
            }
            return Ok(report);
        }

        // POST api/<ScoutingReportController>
        [HttpPost]
        public IActionResult Post(ScoutingReport report)
        {
            report.Date = DateTime.Now;
            Calendar calendar = CultureInfo.InvariantCulture.Calendar;
            report.GrowingWeek = calendar.GetWeekOfYear(report.Date, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Sunday);
            _scoutingReportRepository.Add(report);
            return CreatedAtAction(
                "GetById",
                new { id = report.Id },
                report);
        }

        // PUT api/<ScoutingReportController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, ScoutingReport report)
        {
            if (id != report.Id)
            {
                return BadRequest();
            }
            _scoutingReportRepository.Update(report);
            return NoContent();
        }

        // DELETE api/<ScoutingReportController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _scoutingReportRepository.Delete(id);
            return NoContent();
        }
    }
}
