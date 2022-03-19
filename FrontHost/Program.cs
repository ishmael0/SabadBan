using Core.Services;
using FrontHost.Controllers;
using Microsoft.EntityFrameworkCore;
using FrontHost.DBContext;
using Serilog;
using Serilog.Events;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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
builder.Services.AddDbContext<FrontDB>(options => options.UseSqlServer(constr));
builder.Services.AddSingleton<RandomGenerator, RandomGenerator>();
builder.Services.AddSingleton<SMSService, SMSService>();
builder.Services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp"; });
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
