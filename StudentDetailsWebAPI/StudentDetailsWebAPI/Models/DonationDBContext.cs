using Microsoft.EntityFrameworkCore;

namespace StudentDetailsWebAPI.Models
{
    public class DonationDBContext: DbContext
    {
        public DonationDBContext(DbContextOptions<DonationDBContext> options):base(options)
        {

        }
        public DbSet<Student> DCandidates { get; set; }
    }
}
