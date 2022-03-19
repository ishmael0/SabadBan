using Core.Services;
using FrontHost.Controllers;
using Microsoft.EntityFrameworkCore;
using FrontHost.DBContext;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
var constr = builder.Configuration.GetSection("ConnectionString").Value;
builder.Services.AddDbContext<FrontDB>(options => options.UseSqlServer(String.Format( constr,"DB")));
builder.Services.AddSingleton<RandomGenerator, RandomGenerator>();
builder.Services.AddSingleton<SMSService, SMSService>();
builder.Services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp"; });

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
