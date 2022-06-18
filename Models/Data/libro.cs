namespace Portafolio_Bookmark.Models.Data
{
    public class Libro
    {
        public static bool IsValid { get; protected set; }
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? Publisher { get; set; }
        public string? Cate { get; set; }
        public int Estado { get; set; }
        public string? Portada { get; set; }

    }
}
