using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using App.DB;
using Newtonsoft.Json;
using System.Collections.Generic;
using App.Models;

namespace App.DB
{
    public class PaymentDB : BaseWebSiteDBContext
    {
        public DbSet<Category> Categories { set; get; }

        public PaymentDB(DbContextOptions<PaymentDB> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));


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
    public class PaymentAcc : BaseAccountDBContext<BaseApplicationUser, BaseApplicationRole>
    {
        public PaymentAcc(DbContextOptions<PaymentAcc> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
    public class MAINDBContextFactory : IDesignTimeDbContextFactory<PaymentDB>
    {
        public PaymentDB CreateDbContext(string[] args)
        {
            var o = AppSettingService.GetDbContextOptionsBuilder<PaymentDB>(nameof(App));
            return new PaymentDB(o.Options);
        }
    }
    public class MAINAccContextFactory : IDesignTimeDbContextFactory<PaymentAcc>
    {
        public PaymentAcc CreateDbContext(string[] args)
        {
            var o = AppSettingService.GetDbContextOptionsBuilder<PaymentAcc>(nameof(App));
            return new PaymentAcc(o.Options);
        }
    }
}
