using RentYourHome.Data;
using RentYourHome.Models.UserAdApplications;
using RentYourHome.Services.ClassConverterService;

namespace RentYourHome.Repositories.UserAdApplicationRepository;

public class UserAdApplicationRepository : IUserAdApplicationRepository
{
    private readonly IClassConverterService _classConverterService;
    private readonly DatabaseContext _dbContext;

    public UserAdApplicationRepository(DatabaseContext dbContext, IClassConverterService classConverterService)
    {
        _classConverterService = classConverterService;
        _dbContext = dbContext;
    }

    public async Task<UserAdApplication?> GetUserAdApplication(int adId, int userId)
    {
        return _dbContext.UserAdApplications.FirstOrDefault(ua => ua.AdId == adId && ua.UserId == userId);
    }

    public void DeleteUserAdApplication(UserAdApplication userAdApplication)
    {
        _dbContext.Remove(userAdApplication);
        _dbContext.SaveChanges();
    }
}