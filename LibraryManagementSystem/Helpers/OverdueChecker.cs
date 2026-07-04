using LibraryManagementSystem.Data;
using LibraryManagementSystem.Entities;

namespace LibraryManagementSystem.Helpers
{
    public class OverdueChecker:BackgroundService
    {
        private readonly IServiceProvider iServiceProvider;

        public OverdueChecker(IServiceProvider iServiceProvider)
        {
            Console.WriteLine("[OverdueChecker] Constructor called!");   // ← add

            this.iServiceProvider = iServiceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            // keep running until the app shuts down
            while (!stoppingToken.IsCancellationRequested)
            {

                Console.WriteLine("[OverdueChecker] ExecuteAsync started!");   // ← add

                // do the overdue check
                MarkOverdueBooks();

                // wait 24 hours before running again
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }
        }

        private void MarkOverdueBooks()
        {
            // background services need their own DB scope
            using var scope = iServiceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();

            var overdueRecords = context.BorrowRecords
                .Where(a => a.Status == BorrowStatus.Borrowed && a.DueDate < DateTime.Now)
                .ToList();

            foreach (var record in overdueRecords)
                record.Status = BorrowStatus.Overdue;

            if (overdueRecords.Any())
                context.SaveChanges();
        }
    }
}
