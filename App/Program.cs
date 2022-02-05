global using Core;
global using Core.DB;
global using Core.StartUp;
global using Core.Models;
using Host.DBContext;
using Host;
using Newtonsoft.Json;


var builder = WebApplication.CreateBuilder(args);
var startup = new BaseStartup<AccDB, BaseApplicationUser, BaseApplicationRole>(builder.Configuration, builder.Environment);
startup.ConfigureServices(builder.Services);
var app = builder.Build();
startup.Configure(app, builder.Environment, app.Services);
startup.Seed.CustomSeed(new List<Func<IServiceProvider, Task<bool>>> {
    ProvincesAndCities.AddProvincesAndCitiesAsync
});
app.Run();


 

