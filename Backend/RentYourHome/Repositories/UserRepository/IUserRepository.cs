using RentYourHome.Models.Users;

namespace RentYourHome.Repositories.UserRepository;

public interface IUserRepository
{
    void AddUserToDb(UserDto user);
}