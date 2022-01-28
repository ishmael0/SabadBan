using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models
{
    public class Images
    {
        public string Path { set; get; }
        public string Description { set; get; }
    }
    [SafeToGetAll]
    public class Category: BaseModelWithTitle
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
    public class Vendor: BaseModel
    {
        [ForeignKey("CityId")]
        public virtual City City { set; get; }
        public int CityId { set; get; }

        public string Address { set; get; }
        public string Description { set; get; }
        public decimal Longitude { set; get; }
        public decimal Latitude { set; get; }

    } 
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
    public class VendorBankAccount : BaseModel
    {
        [ForeignKey("VendorId")]
        public virtual Vendor Vendor { set; get; }
        public int VendorId { set; get; }
        public bool IsConfirmed { set; get; }
        public int BankTitle { set; get; }
        public string AccountNumber { set; get; }
        [MaxLength(24)]
        [MinLength(24)]
        public string Sheba { set; get; }
        [MaxLength(16)]
        [MinLength(16)]
        public string CardNumber { set; get; }
        public int Priority { set; get; }

    }
    public class VendorBalance : BaseModel
    {
        [ForeignKey("VendorId")]
        public virtual Vendor Vendor { set; get; }
        public int VendorId { set; get; }
        public int Free { set; get; }
        public int Paid { set; get; }
        public int Block{ set; get; }
    }
    public class VendorWithdraw : BaseModel
    {
        [ForeignKey("VendorId")]
        public virtual Vendor Vendor { set; get; }
        public int VendorId { set; get; }
        public int Value { set; get; }
        [ForeignKey("VendorBankAccountId")]
        public virtual VendorBankAccount VendorBankAccount { set; get; }
        public int VendorBankAccountId { set; get; }
    }
    public class Vendee:BaseModel
    {
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string PhoneNumber { set; get; }
        public string Password { get; set; }
        public bool PhoneNumberConfirm { get; set; }
        public List<Address> Addresses { get; set; }
    }
    public class Address : BaseModelWithTitle
    {
        public string PostalCode { set; get; }
        public string Province { set; get; }
        public string City { set; get; }
        public string FullAddress { set; get; }
        public string Latitude { set; get; }
        public string Longitude { set; get; }
    }
}
