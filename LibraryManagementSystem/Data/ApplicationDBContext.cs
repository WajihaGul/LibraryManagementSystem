using LibraryManagementSystem.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Data;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Author> Authors { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<BorrowRecord> BorrowRecords { get; set; }
    public DbSet<FinePenalty> FinePenalties { get; set; }
    public DbSet<Reservation> Reservations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FinePenalty>()
            .HasOne(f => f.User)
            .WithMany(u => u.FinePenalties)
            .HasForeignKey(f => f.UserID)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<FinePenalty>()
            .HasOne(f => f.BorrowRecord)
            .WithOne(b => b.FinePenalty)
            .HasForeignKey<FinePenalty>(f => f.BorrowID)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<FinePenalty>()
            .Property(f => f.FineAmount)
            .HasPrecision(10, 2);

        modelBuilder.Entity<User>()
    .Property(u => u.Role)
    .HasConversion<string>();

        modelBuilder.Entity<Book>()
            .Property(b => b.Genre)
            .HasConversion<string>();

        modelBuilder.Entity<BorrowRecord>()
            .Property(b => b.Status)
            .HasConversion<string>();

        modelBuilder.Entity<Reservation>()
            .Property(r => r.Status)
            .HasConversion<string>();
    }
}
