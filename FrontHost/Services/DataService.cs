using Core.Services;
using Core.StartUp;
using FrontHost.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FrontHost.Services
{
    public class SMSService
    {
        public async Task<bool> SendAsync(string phoneNumber, string text)
        {
            await Task.Delay(2000);
            return true;
        }
    }
    public class AppSettings
    {
        public string ValidIssuer { set; get; }
        public string ValidAudience { set; get; }
        public string IssuerSigningKey { set; get; }
        public string TokenDecryptionKey { set; get; }

    }
    public class SMSDataStoreHelper
    {
        public int Code { get; set; }
        public int Count { get; set; }
        public DateTime LastTryDateTime { set; get; }
    }


    public class DataService
    {
        public DataService(IOptions<AppSettings> options)
        {
            this.options = options.Value;
            VerificationCodes = new(this, async (s, d, prev) =>
            {
                if (prev == null)
                {
                    var x = new SMSDataStoreHelper
                    {
                        Code = RandomGenerator.NextInt(10000, 99999),
                        Count = 1,
                        LastTryDateTime = DateTime.Now
                    };
                    return x;
                }
                else
                {
                    prev.Data.Count++;
                    if (prev.Data.LastTryDateTime < DateTime.Now.AddHours(-1))
                    {
                        prev.Data.Count /= 2;
                    }
                    if (prev.Data.Count > Captcha.MaxTries) return null;
                    prev.Data.Code = RandomGenerator.NextInt(10000, 99999);
                    prev.Data.LastTryDateTime = DateTime.Now;
                    return prev.Data;
                }
            }, new TimeSpan(0, 2, 0));
        }
        public DictionaryCacheManager<string, DataService, SMSDataStoreHelper> VerificationCodes;
        private readonly AppSettings options;

        public bool IsVerificationCodeValid(string phone, int code)
        {
            if (VerificationCodes.TryGetValue(phone, out var verificationCode) && verificationCode.Data.Code == code)
            {
                return true;
            }
            return false;
        }
        public bool RefreshVerificationCode(string phone, out int verificationCode)
        {
            if (VerificationCodes.TryGetValue(phone, out var v, true))
            {
                verificationCode = v.Data.Code;
                return true;
            }
            verificationCode = 0;
            return false;
        }


        public string TokenGen(Vendee applicationUser)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = AppSettingService.Security.JWT_ValidIssuer,
                Audience = AppSettingService.Security.JWT_ValidAudience,
                IssuedAt = DateTime.UtcNow,
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.Date.AddDays(1),
                Subject = new ClaimsIdentity(new List<Claim> {
                             new Claim(nameof(Vendee.CellPhone), applicationUser.CellPhone),
                             new Claim(nameof(Vendee.Id), applicationUser.Id.ToString()),
                         }),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(options.IssuerSigningKey)),SecurityAlgorithms.HmacSha256Signature),
            };
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtTokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            var token = jwtTokenHandler.WriteToken(jwtToken);
            return token;
        }
    }
}