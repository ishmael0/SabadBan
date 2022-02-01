using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Newtonsoft.Json;
using System.Collections.Generic;
using Host.Models;

namespace Host.DBContext
{
    public class DB : BaseWebSiteDBContext
    {
        public DbSet<Category> Categories { set; get; }
        public DbSet<Province> Provinces { set; get; }
        public DbSet<City> Cities { set; get; }
        public DbSet<Bank> Banks { set; get; }
        public DbSet<Vendor> Vendors { set; get; }
        public DbSet<VendorSell> VendorSells { set; get; }
        public DbSet<VendorBankAccount> VendorBankAccounts { set; get; }
        public DB(DbContextOptions<DB> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));
            modelBuilder.Entity<Vendee>().Property(e => e.Addresses).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Address>>(v));


            //            modelBuilder.Entity<Content>().HasMany(p => p.KeyWords).WithMany(p => p.Contents).UsingEntity<ContentKeyword>(
            //j => j.HasOne(pt => pt.Keyword).WithMany(t => t.ContentKeyWords).HasForeignKey(pt => pt.KeywordId),
            //j => j.HasOne(pt => pt.Content).WithMany(p => p.ContentKeyWords).HasForeignKey(pt => pt.ContentId),
            //j => { j.HasKey(t => new { t.ContentId, t.KeywordId }); });



            //        modelBuilder.Entity<Content>().HasMany(p => p.KeyWords).WithMany(p => p.Contents).UsingEntity<ContentKeyword>(
            //j => j.HasOne(pt => pt.Keyword).WithMany(t => t.ContentKeyWords).HasForeignKey(pt => pt.KeywordId),
            //j => j.HasOne(pt => pt.Content).WithMany(p => p.ContentKeyWords).HasForeignKey(pt => pt.ContentId),
            //j => { j.HasKey(t => new { t.ContentId, t.KeywordId }); });

            //        modelBuilder.Entity<Content>().HasMany(p => p.Labels).WithMany(p => p.Contents).UsingEntity<ContentLabel>(
            //    j => j.HasOne(pt => pt.Label).WithMany(t => t.ContentLabels).HasForeignKey(pt => pt.LabelId),
            //    j => j.HasOne(pt => pt.Content).WithMany(p => p.ContentLabels).HasForeignKey(pt => pt.ContentId),
            //    j => { j.HasKey(t => new { t.ContentId, t.LabelId }); });

            //        modelBuilder.Entity<Content>().HasMany(p => p.File2s).WithMany(p => p.Contents).UsingEntity<ContentFile2>(
            //j => j.HasOne(pt => pt.File2).WithMany(t => t.ContentFile2s).HasForeignKey(pt => pt.File2Id),
            //j => j.HasOne(pt => pt.Content).WithMany(p => p.ContentFile2s).HasForeignKey(pt => pt.ContentId),
            //j => { j.HasKey(t => new { t.ContentId, t.File2Id }); });

        }
    }
    public class AccDB : BaseAccountDBContext<BaseApplicationUser, BaseApplicationRole>
    {
        public AccDB(DbContextOptions<AccDB> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
    public class MAINDBContextFactory : IDesignTimeDbContextFactory<DB>
    {
        public DB CreateDbContext(string[] args)
        {
            var o = AppSettingService.GetDbContextOptionsBuilder<DB>(nameof(Host));
            return new DB(o.Options);
        }
    }
    public class MAINAccContextFactory : IDesignTimeDbContextFactory<AccDB>
    {
        public AccDB CreateDbContext(string[] args)
        {
            var o = AppSettingService.GetDbContextOptionsBuilder<AccDB>(nameof(Host));
            return new AccDB(o.Options);
        }
    }
}
