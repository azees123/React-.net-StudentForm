using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentDetailsWebAPI.Models;

namespace StudentDetailsWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DCandidateController : ControllerBase
    {
        private readonly DonationDBContext _context;

        public DCandidateController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/Student
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetDCandidates()
        {
            return await _context.DCandidates.ToListAsync();
        }

        // GET: api/Student/5
        [HttpGet("{Sid1}")]
        public async Task<ActionResult<Student>> GetDCandidate(int Sid)
        {
            var Student = await _context.DCandidates.FindAsync(Sid);

            if (Student == null)
            {
                return NotFound();
            }

            return Student;
        }

        // PUT: api/Student/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{Sid}")]
        public async Task<IActionResult> PutDCandidate(int Sid, Student Student)
        {
            Student.Sid = Sid;

            _context.Entry(Student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DCandidateExists(Sid))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Student
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("post")]
        public async Task<ActionResult<Student>> PostDCandidate(Student Student)
        {
            _context.DCandidates.Add(Student);
            _context.SaveChangesAsync();

            return Ok(Student);
        }

        // DELETE: api/Student/5
        [HttpDelete("{Sid}")]
        public async Task<IActionResult> DeleteDCandidate(int Sid)
        {
            var Student = await _context.DCandidates.FindAsync(Sid);
            if (Student == null)
            {
                return NotFound();
            }

            _context.DCandidates.Remove(Student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DCandidateExists(int Sid)
        {
            return _context.DCandidates.Any(e => e.Sid == Sid);
        }
    }
}
