global using Core;
global using Core.DB;
global using Core.StartUp;
global using Core.Models;
using App.DBContext;

var builder = WebApplication.CreateBuilder(args);

// Manually create an instance of the Startup class
var startup = new BaseStartup<AccDB, BaseApplicationUser, BaseApplicationRole>(builder.Configuration, builder.Environment);
// Manually call ConfigureServices()
startup.ConfigureServices(builder.Services);
var app = builder.Build();
var x = app.Services.CreateScope();
var y = x.ServiceProvider.GetRequiredService<AccDB>();

startup.Configure(app, builder.Environment, app.Services);
startup.Seed.CustomSeed(new List<Func<IServiceProvider, Task<bool>>> { });
// Add services to the container.
app.Run();


 