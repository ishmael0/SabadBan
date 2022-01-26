global using Core;
global using Core.DB;
global using Core.StartUp;
global using Core.Models;
using App.DB;

var builder = WebApplication.CreateBuilder(args);

// Manually create an instance of the Startup class
var startup = new BaseStartup<PaymentAcc, BaseApplicationUser, BaseApplicationRole>(builder.Configuration, builder.Environment);

// Manually call ConfigureServices()
startup.ConfigureServices(builder.Services);

// Add services to the container.
var app = builder.Build();
app.Run();


 