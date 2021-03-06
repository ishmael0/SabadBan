// <auto-generated />
using System;
using BackHost.DBContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BackHost.DB_Migration
{
    [DbContext(typeof(DB))]
    [Migration("20220424074044__18")]
    partial class _18
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("BackHost.DBContext.Bank", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("AccountNumberValidator")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CardValidator")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<string>("ShebaValidator")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Banks");
                });

            modelBuilder.Entity("BackHost.DBContext.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Icon")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Images")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ParentCategoryId")
                        .HasColumnType("int");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ParentCategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("BackHost.DBContext.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<int>("ProvinceId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("BackHost.DBContext.Invoice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Discount")
                        .HasColumnType("int");

                    b.Property<string>("Guid")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InvoiceDetails")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("InvoiceState")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Paid")
                        .HasColumnType("datetime2");

                    b.Property<int>("PaymentType")
                        .HasColumnType("int");

                    b.Property<int>("PostCost")
                        .HasColumnType("int");

                    b.Property<int>("PostType")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("VendeeId")
                        .HasColumnType("int");

                    b.Property<int>("VendorId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VendeeId");

                    b.HasIndex("VendorId");

                    b.ToTable("Invoices");
                });

            modelBuilder.Entity("BackHost.DBContext.Province", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("BackHost.DBContext.Vendee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Addresses")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CellPhone")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("CellPhoneConfirm")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MelliCode")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CellPhone")
                        .IsUnique()
                        .HasFilter("[CellPhone] IS NOT NULL");

                    b.HasIndex("MelliCode")
                        .IsUnique()
                        .HasFilter("[MelliCode] IS NOT NULL");

                    b.ToTable("Vendees");
                });

            modelBuilder.Entity("BackHost.DBContext.Vendor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CellPhone1")
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.Property<bool>("CellPhone1Confirm")
                        .HasColumnType("bit");

                    b.Property<string>("CellPhone2")
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.Property<bool>("CellPhone2Confirm")
                        .HasColumnType("bit");

                    b.Property<int>("CityId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Images")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Latitude")
                        .HasColumnType("decimal(10,8)");

                    b.Property<string>("Logo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Longitude")
                        .HasColumnType("decimal(11,8)");

                    b.Property<string>("MelliCode")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("Phone1")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.Property<bool>("Phone1Confirm")
                        .HasColumnType("bit");

                    b.Property<string>("Phone2")
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.Property<bool>("Phone2Confirm")
                        .HasColumnType("bit");

                    b.Property<string>("PostalCOde")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("ShortDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TitleEn")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("MelliCode")
                        .IsUnique()
                        .HasFilter("[MelliCode] IS NOT NULL");

                    b.ToTable("Vendors");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorBalance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Block")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<int>("Free")
                        .HasColumnType("int");

                    b.Property<int>("Paid")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("VendorId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VendorId");

                    b.ToTable("VendorBalances");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorBankAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("BankId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<int>("Priority")
                        .HasMaxLength(16)
                        .HasColumnType("int");

                    b.Property<string>("Sheba")
                        .HasMaxLength(24)
                        .HasColumnType("nvarchar(24)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VendorId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BankId");

                    b.HasIndex("VendorId");

                    b.ToTable("VendorBankAccounts");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorComment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<int>("Rank")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VendorId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VendorId");

                    b.ToTable("VendorComments");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorSell", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Canceled")
                        .HasColumnType("int");

                    b.Property<int>("CommentsCount")
                        .HasColumnType("int");

                    b.Property<int>("Confirmed")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<int>("Created")
                        .HasColumnType("int");

                    b.Property<float>("Rank")
                        .HasColumnType("real");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("Successed")
                        .HasColumnType("int");

                    b.Property<int>("VendorId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VendorId")
                        .IsUnique();

                    b.ToTable("VendorSells");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorSocialMedia", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VendorId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VendorId");

                    b.ToTable("SocilalMedias");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorWithdraw", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Number")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.Property<int>("VendorBankAccountId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VendorBankAccountId");

                    b.ToTable("VendorWithdraws");
                });

            modelBuilder.Entity("Core.Models.FilesEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileEntityDetails")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FileType")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("FilesEntities");
                });

            modelBuilder.Entity("Core.Models.LogEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<int>("EntityId")
                        .HasColumnType("int");

                    b.Property<int>("EntityState")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserIP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LogEntities");
                });

            modelBuilder.Entity("Core.Models.SocialMedia", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<string>("Icon")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SocialMedias");
                });

            modelBuilder.Entity("Core.Models.ToDo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("Create")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("TaskStatus")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ToDos");
                });

            modelBuilder.Entity("BackHost.DBContext.Category", b =>
                {
                    b.HasOne("BackHost.DBContext.Category", "ParentCategory")
                        .WithMany()
                        .HasForeignKey("ParentCategoryId");

                    b.Navigation("ParentCategory");
                });

            modelBuilder.Entity("BackHost.DBContext.City", b =>
                {
                    b.HasOne("BackHost.DBContext.Province", "Province")
                        .WithMany()
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Province");
                });

            modelBuilder.Entity("BackHost.DBContext.Invoice", b =>
                {
                    b.HasOne("BackHost.DBContext.Vendee", "Vendee")
                        .WithMany()
                        .HasForeignKey("VendeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackHost.DBContext.Vendor", "Vendor")
                        .WithMany()
                        .HasForeignKey("VendorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vendee");

                    b.Navigation("Vendor");
                });

            modelBuilder.Entity("BackHost.DBContext.Vendor", b =>
                {
                    b.HasOne("BackHost.DBContext.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("City");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorBalance", b =>
                {
                    b.HasOne("BackHost.DBContext.Vendor", "Vendor")
                        .WithMany()
                        .HasForeignKey("VendorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vendor");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorBankAccount", b =>
                {
                    b.HasOne("BackHost.DBContext.Bank", "Bank")
                        .WithMany()
                        .HasForeignKey("BankId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BackHost.DBContext.Vendor", "Vendor")
                        .WithMany()
                        .HasForeignKey("VendorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bank");

                    b.Navigation("Vendor");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorComment", b =>
                {
                    b.HasOne("BackHost.DBContext.Vendor", "Vendor")
                        .WithMany()
                        .HasForeignKey("VendorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vendor");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorSell", b =>
                {
                    b.HasOne("BackHost.DBContext.Vendor", "Vendor")
                        .WithOne("VendorSell")
                        .HasForeignKey("BackHost.DBContext.VendorSell", "VendorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vendor");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorSocialMedia", b =>
                {
                    b.HasOne("BackHost.DBContext.Vendor", "Vendor")
                        .WithMany()
                        .HasForeignKey("VendorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vendor");
                });

            modelBuilder.Entity("BackHost.DBContext.VendorWithdraw", b =>
                {
                    b.HasOne("BackHost.DBContext.VendorBankAccount", "VendorBankAccount")
                        .WithMany()
                        .HasForeignKey("VendorBankAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("VendorBankAccount");
                });

            modelBuilder.Entity("BackHost.DBContext.Vendor", b =>
                {
                    b.Navigation("VendorSell");
                });
#pragma warning restore 612, 618
        }
    }
}
