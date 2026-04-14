namespace JobBoard.Dtos
{
    public class ApplicationResponseDto
    {
        public int Id { get; set; }
        public string JobTitle { get; set; } = string.Empty;
        public string FreelancerName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime AppliedAt { get; set; }
    }
}
