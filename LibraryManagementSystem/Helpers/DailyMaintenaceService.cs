using LibraryManagementSystem.Data;
using LibraryManagementSystem.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Eventing.Reader;

namespace LibraryManagementSystem.Helpers
{
    public class DailyMaintenaceService:BackgroundService
    {
        private readonly IServiceProvider iServiceProvider;

        public DailyMaintenaceService(IServiceProvider iServiceProvider)
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
                ProcessOverdueRecords();
                ExpireReservations();

                // wait 24 hours before running again
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }
        }

        private void ProcessOverdueRecords()
        {
            // background services need their own DB scope
            using var scope = iServiceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();

            var overdueRecords = context.BorrowRecords
                .Include(a => a.FinePenalty)
                .Where(a => a.Status == BorrowStatus.Borrowed && a.DueDate < DateTime.Now)
                .ToList();

            foreach (var record in overdueRecords)
            {
                record.Status = BorrowStatus.Overdue;

                var fineAmount = (DateTime.Now - record.DueDate).Days * 10;

                if(record.FinePenalty == null)
                {
                    context.FinePenalties.Add(
                        new FinePenalty
                        {
                            BorrowID = record.BorrowID,
                            FineAmount = fineAmount,
                            IsPaid = false,
                            IssuedAt = DateTime.Now,
                            UserID = record.UserID
                        });
                }
                else if (!record.FinePenalty.IsPaid)
                {
                    record.FinePenalty.FineAmount = fineAmount;
                }
            }

            
            if (overdueRecords.Any())
                context.SaveChanges();
        }

        private void ExpireReservations()
        {
            using var scope = iServiceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();

            var expiredReservations = context.Reservations
                .Where(r => r.Status == ReservationStatus.Pending && r.ExpiresAt < DateTime.Now)
                .ToList();

            foreach (var reservation in expiredReservations)
                reservation.Status = ReservationStatus.Expired;

            if (expiredReservations.Any())
                context.SaveChanges();
        }
    }
}
