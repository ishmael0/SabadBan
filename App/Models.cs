using Host.DBContext;
using Core.Controllers;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Host.Models
{
    public class Images
    {
        public string Path { set; get; }
        public string Description { set; get; }
    }
    [SafeToGetAll]
    public class Category : BaseModelWithTitle
    {
        [ForeignKey("ParentCategoryId")]
        public virtual Category? ParentCategory { set; get; }
        public int? ParentCategoryId { set; get; }
        public List<Images> Images { set; get; }
        public string Description { set; get; }
        public string Icon { set; get; }
        public int Priority { set; get; } = 0;
        public string Color { set; get; }
    }
    [SafeToGetAll]
    public class Province : BaseModelWithTitle
    {
    }
    [SafeToGetAll]
    public class City : BaseModelWithTitle
    {
        [ForeignKey("ProvinceId")]
        public virtual Province Province { set; get; }
        public int ProvinceId { set; get; }
    }
    [SafeToGetAll]
    public class Bank : BaseModelWithTitle
    {
        public string ShebaValidator { set; get; }
        public string CardValidator { set; get; }
        public string AccountNumberValidator { set; get; }
    }
    [Index(nameof(MelliCode), IsUnique = true)]
    public class Vendor : BaseModelWithTitle
    {

        [ForeignKey("CityId")]
        public virtual City City { set; get; }
        public int CityId { set; get; }
        public string Address { set; get; }
        public string TitleEn { set; get; }
        public string MelliCode { set; get; }

        [MaxLength(100)]
        public string PostalCOde { set; get; }
        public string ShortDescription { set; get; }
        public string Description { set; get; }
        [Column(TypeName = "decimal(11,8)")]
        public decimal Longitude { set; get; }
        [Column(TypeName = "decimal(10,8)")]
        public decimal Latitude { set; get; }
        [MaxLength(11)]
        public string Phone1 { set; get; }
        [MaxLength(11)]
        public string Phone2 { set; get; }
        [MaxLength(11)]
        public string CellPhone1 { set; get; }
        [MaxLength(11)]
        public string CellPhone2 { set; get; }

        public List<Images> Images { set; get; }
        public string Logo { set; get; }

    }
    public class VendorRequest : BaseModelWithTitle
    {

    }
    [Index(nameof(VendorId), IsUnique = true)]
    public class VendorSell : BaseModel
    {
        [ForeignKey("VendorId")]
        public virtual Vendor Vendor { set; get; }
        public int VendorId { set; get; }
        public int Successed { set; get; }
        public int Confirmed { set; get; }
        public int Created { set; get; }
        public int Canceled { set; get; }
    }
    public class VendorBankAccount : BaseModelWithTitle
    {
        [ForeignKey("VendorId")]
        public virtual Vendor Vendor { set; get; }
        public int VendorId { set; get; }


        [ForeignKey("BankId")]
        public virtual Bank Bank { set; get; }
        public int BankId { set; get; }
        //public string AccountNumber { set; get; }
        [MaxLength(24)]
        [MinLength(24)]
        public string Sheba { set; get; }
        [MaxLength(16)]
        [MinLength(16)]
        //public string CardNumber { set; get; }
        public int Priority { set; get; }

    }
    public class VendorBalance : BaseModel
    {
        [ForeignKey("VendorId")]
        public virtual Vendor Vendor { set; get; }
        public int VendorId { set; get; }
        public int Free { set; get; }
        public int Paid { set; get; }
        public int Block { set; get; }
    }
    public class VendorWithdraw : BaseModel
    {
        [ForeignKey("VendorBankAccountId")]
        public virtual VendorBankAccount VendorBankAccount { set; get; }
        public int VendorBankAccountId { set; get; }
        public int Value { set; get; }
        public string Number { set; get; }
        public int Type { set; get; }
        public DateTime DateTime { set; get; }
    }
    [Index(nameof(CellPhone), IsUnique = true)]
    [Index(nameof(MelliCode), IsUnique = true)]
    public class Vendee : BaseModel
    {
        public string MelliCode { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string CellPhone { set; get; }
        public string Password { get; set; }
        public bool CellPhoneConfirm { get; set; }
        public List<Address> Addresses { get; set; }
    }
    public class Address
    {
        public string Title { set; get; }
        public string PostalCode { set; get; }
        public int CityId { set; get; }
        public string FullAddress { set; get; }
        public string Latitude { set; get; }
        public string Longitude { set; get; }
    }
    public enum InvoiceState
    {

    }
    public class InvoiceDetail
    {
        public string Title { set; get; }
        public int PriceOfOne { set; get; }
        public int Off { set; get; }
        public int Count { set; get; }
        public int FinalPrice => PriceOfOne * Count - Off;
        public InvoiceState InvoiceState { set; get; }
    }
    public class Invoice : BaseModel
    {
        [ForeignKey("VendorId")]
        public virtual Vendor Vendor { set; get; }
        public int VendorId { set; get; }


        [ForeignKey("VendeeId")]
        public virtual Vendee Vendee { set; get; }
        public int VendeeId { set; get; }



        public int FinalPrice => Price - Off;
        public int Off { set; get; }
        public int Price => InvoiceDetails?.Sum(c => c.FinalPrice) ?? 0;
        public List<InvoiceDetail> InvoiceDetails { set; get; }
    }
}
