using Core.Services;
using FrontHost.Controllers;
using FrontHost.Services;
using Microsoft.EntityFrameworkCore;
using FrontHost.DBContext;
using Serilog;
using Serilog.Events;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using BackHost.DBContext;
using Core.StartUp;

using Microsoft.AspNetCore.Authorization;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
AppSettingService.Publics.App_Name = "Sabadban";
AppSettingService.Privates.App_ConnectionString = "Data Source=.;Initial Catalog={0};User id=sa;Password=09016200321a@0A";
builder.Services.AddControllersWithViews()
                .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)); })
                .AddNewtonsoftJson(new Action<MvcNewtonsoftJsonOptions>(
              (target) =>
              {
                  target.SerializerSettings.ContractResolver = new DefaultContractResolver();
                  target.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm";
                  target.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
                  target.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                  //target.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
              }
              ));
var constr = builder.Configuration.GetSection("ConnectionString").Value;
builder.Services.AddDbContext<DB>(options => options.UseSqlServer(constr));
builder.Services.AddSingleton<DataService, DataService>();
builder.Services.AddSingleton<SMSService, SMSService>();
builder.Services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp"; });

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection(nameof(AppSettings)));
var tempAppsettings = builder.Configuration.GetSection(nameof(AppSettings)).Get<AppSettings>();
builder.Services.AddAuthorization(configureOptions =>
{
    configureOptions.AddPolicy(nameof(Vendor) + nameof(Vendor.Id), p => p.RequireClaim(nameof(Vendor) + nameof(Vendor.Id)));
}
);
builder.Services.AddAuthentication(configureOptions =>
{
    configureOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    configureOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    configureOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(configureOptions =>
{
    configureOptions.RequireHttpsMetadata = false;
    configureOptions.SaveToken = true;
    configureOptions.IncludeErrorDetails = true;
    configureOptions.TokenValidationParameters = new  TokenValidationParameters
    {
        ValidateIssuer = false, 
        ValidateAudience = false, 
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        RequireSignedTokens = true,
        RequireExpirationTime = true,
        ValidIssuer = ((tempAppsettings.ValidIssuer)),
        ValidAudience = ((tempAppsettings.ValidAudience)),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(((tempAppsettings.IssuerSigningKey)))),
        TokenDecryptionKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(((tempAppsettings.TokenDecryptionKey)))),
        ClockSkew = TimeSpan.Zero // default: 5 min
    };
 });

Log.Logger = new LoggerConfiguration()
.MinimumLevel.Override("Microsoft", LogEventLevel.Information)
.Enrich.FromLogContext()
.WriteTo.RollingFile("logs/Log-{Date}.txt", Serilog.Events.LogEventLevel.Debug, fileSizeLimitBytes: 1000000, shared: true)
.CreateLogger();
builder.Host.UseSerilog();



var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseStaticFiles();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapDefaultControllerRoute();
});
 

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";
    if (app.Environment.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer("http://localhost:4201");
    }
});
app.Run();
