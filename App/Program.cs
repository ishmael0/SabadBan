global using Core;
global using Core.DB;
global using Core.StartUp;
global using Core.Models;
using Host.DBContext;

var builder = WebApplication.CreateBuilder(args);
var startup = new BaseStartup<AccDB, BaseApplicationUser, BaseApplicationRole>(builder.Configuration, builder.Environment);
startup.ConfigureServices(builder.Services);
var app = builder.Build();
//var x = app.Services.CreateScope();
//var y = x.ServiceProvider.GetRequiredService<AccDB>();
startup.Configure(app, builder.Environment, app.Services);
startup.Seed.CustomSeed(new List<Func<IServiceProvider, Task<bool>>> { });
app.Run();


 