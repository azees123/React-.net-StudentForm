using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentDetailsWebAPI.Models
{
    public class Student
    {
        [Key]
        public int Sid { get; set; }
        
        public string Fullname { get; set; }
        [Column(TypeName = "nvarchar(100")]

        public string DOB { get; set; }
        [Column(TypeName = "date(10")]

        public char Gender { get; set; }
        [Column(TypeName = "nvarchar(100")]

        public string Email { get; set; }
        [Column(TypeName = "nvarchar(100")]
        public string Number { get; set; }
        
    }
}
