namespace JobBoard.Models
{
    public class Application
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public Job? Job { get; set; } 
        public int FreelancerId { get; set; }
        public User? Freelancer { get; set; } 
        public string Status { get; set; } = string.Empty; // Pending or Accepted or Rejected
        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
    }
}
