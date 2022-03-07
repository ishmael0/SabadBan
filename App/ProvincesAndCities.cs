using Host.DBContext;
using Host.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Host
{
    public class ProvincesAndCities
    {
        public static async Task<bool> AddProvincesAndCitiesAsync(IServiceProvider service)
        {
            var collection = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(System.IO.File.ReadAllText("ProvincesAndCities.txt"))
    .OrderBy(c => c.Key).ToDictionary(c => c.Key, c => c.Value.OrderBy(d => d).Select(d => d.Trim()).ToList());
            var _context = service.CreateScope().ServiceProvider.GetRequiredService<DB>();


            var isexist = _context.Provinces.Any();
            if (!isexist)
            {
                foreach (var item in collection)
                {
                    var province = new Province { Title = item.Key, Create = DateTime.Now, Status = Status.Published };
                    _context.Provinces.Add(province);
                    item.Value.ForEach(c =>
                    {
                        _context.Cities.Add(new City { Title = c, Create = DateTime.Now, Status = Status.Published, Province = province });
                    });
                }
                await _context.SaveChangesAsync();
                var Provinces = await _context.Provinces.ToListAsync();
                var Cities = await _context.Cities.ToListAsync();
                return true;
            }
            return false;
        }
    }
}
