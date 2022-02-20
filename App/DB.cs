using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Newtonsoft.Json;
using System.Collections.Generic;
using Host.Models;
using Core.Controllers;
using Microsoft.Extensions.Options;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Core.Services;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Host.DBContext
{
    public class VendorController : BaseController<DB, Vendor>
    {
        public VendorController(DB dbContext, UserPermissionManager upm, IOptions<AppSettingPrivates> options) : base(dbContext, upm, options)
        {
        }
        [HttpGet]
        public async Task<JR<bool>> ConfirmVendor([FromQuery] int id)
        {
            var item = await _context.Vendors.FirstOrDefaultAsync(c => c.Id == id);
            if (item == null)
            {
                return JR<bool>.FailureBadRequest("شناسه فروشگاه وجود ندارد");
            }
            _context.VendorSells.Add(new VendorSell { VendorId = id });
            _context.VendorBalances.Add(new VendorBalance { VendorId = id });
            await _context.SaveChangesAsync();
            return JR<bool>.OK("به روز رسانی فروشگاه با موفقیت انجام شد");
        }
    }

    public class InvoiceController : BaseController<DB, Invoice>
    {
        public InvoiceController(DB dbContext, UserPermissionManager upm, IOptions<AppSettingPrivates> options ) : base(dbContext, upm, options )
        {
            
        }
        public override IQueryable<Invoice> BeforeGet(IQueryable<Invoice> q)
        {
            return base.BeforeGet(q).Include(c=>c.Vendee).Include(c=>c.Vendor);
        }
    }




    public class DB : BaseWebSiteDBContext
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
        public DB(DbContextOptions<DB> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));
            modelBuilder.Entity<Vendee>().Property(e => e.Addresses).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Address>>(v));
            modelBuilder.Entity<Vendor>().Property(e => e.Images).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<Images>>(v));
            modelBuilder.Entity<Invoice>().Property(e => e.InvoiceDetails).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<List<InvoiceDetail>>(v));
            modelBuilder.Entity<VendorSell>().Property(e => e.VendorId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
            modelBuilder.Entity<VendorBankAccount>().Property(e => e.VendorId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
            modelBuilder.Entity<VendorBalance>().Property(e => e.VendorId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);
            modelBuilder.Entity<VendorWithdraw>().Property(e => e.VendorBankAccountId).Metadata.SetAfterSaveBehavior( PropertySaveBehavior.Ignore);

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
