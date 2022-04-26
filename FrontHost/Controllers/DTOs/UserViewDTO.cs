namespace FrontHost.Controllers
{
    public class UserViewDTO
    {
        public string Token { get; }
        public BackHost.DBContext.Vendee Vendee { get; }

        public UserViewDTO(string token, BackHost.DBContext.Vendee v)
        {
            Token = token;
            Vendee = v;
        }
    }
}