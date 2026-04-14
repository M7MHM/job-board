namespace JobBoard.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty; // Open or Closed 
        public int ClientId { get; set; }
        public User? Client { get; set; } 
        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}
