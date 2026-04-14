namespace JobBoard.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // Client or Freelancer
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}
