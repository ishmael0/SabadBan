using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore.Metadata;
using FrontHost.Models;
namespace FrontHost.DBContext
{
    public class FrontDB  :DbContext
    {
        public DbSet<Category> Categories { set; get; }
        public DbSet<Province> Provinces { set; get; }
        public DbSet<City> Cities { set; get; }
        public DbSet<Bank> Banks { set; get; }
        public DbSet<Vendor> Vendors { set; get; }
        public DbSet<VendorSell> VendorSells { set; get; }
        public DbSet<VendorBalance> VendorBalances { set; get; }
        public DbSet<VendorBankAccount> VendorBankAccounts { set; get; }
        public DbSet<VendorWithdraw>  VendorWithdraws { set; get; }
        public DbSet<Vendee>  Vendees{ set; get; }
        public DbSet<Invoice>  Invoices{ set; get; }
        public DbSet<VendorSocialMedia> SocilalMedias{ set; get; }
        public FrontDB(DbContextOptions<FrontDB> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));
            modelBuilder.Entity<Vendee>().Property(e => e.Addresses).HasConversion(v => JsonConvert.SerializeObject(v??new List<Address>()), v => JsonConvert.DeserializeObject<List<Address>>(v));
            modelBuilder.Entity<Vendor>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v??new List<Images>()), v => JsonConvert.DeserializeObject<List<Images>>(v));
            modelBuilder.Entity<Invoice>().Property(e => e.InvoiceDetails).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<InvoiceDetail>>(v));
            modelBuilder.Entity<VendorSell>().Property(e => e.VendorId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
            modelBuilder.Entity<VendorBankAccount>().Property(e => e.VendorId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
            modelBuilder.Entity<VendorBalance>().Property(e => e.VendorId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
            modelBuilder.Entity<VendorWithdraw>().Property(e => e.VendorBankAccountId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
            modelBuilder.Entity<Invoice>().Property(e => e.VendeeId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
            modelBuilder.Entity<Invoice>().Property(e => e.VendorId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
            modelBuilder.Entity<VendorSocialMedia>().Property(e => e.VendorId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
        }
    }
 
}
