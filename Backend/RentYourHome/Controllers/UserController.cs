using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentYourHome.Models.Users;
using RentYourHome.Repositories.UserRepository;

namespace RentYourHome.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserRepository _userRepository;

    public UserController(ILogger<UserController> logger, IUserRepository userRepository)
    {
        _logger = logger;
        _userRepository = userRepository;
    }

    [HttpPost("create")]
    public ActionResult<UserReqDto> PostUser([Required] UserReqDto user)
    {
        try
        {
            _userRepository.AddUserToDb(user);
            return Ok(user);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting user data.");
            return NotFound("Error getting user data.");
        }
    }

    [HttpGet("all")]
    public ActionResult<string> GetUsers()
    {
        try
        {
            return Ok("The frontend-backend connection is established");
        }
        catch (Exception e)
        {
            //_logger.LogError(e, "Error getting user data.");
            return NotFound("Error getting user data.");
        }
    }

    [HttpGet("user/{userName}")]
    public ActionResult<UserDto> GetUserByUserName(string userName)
    {
        try
        {
            return Ok(_userRepository.GetUserByUserName(userName));
        }
        catch (Exception e)
        {
            //_logger.LogError(e, "Error getting user data.");
            return NotFound("Error getting user data.");
        }
    }

    [HttpDelete("user/{id}")]
    public ActionResult<int> DeleteUserById(int id)
    {
        try
        {
            return Ok();
        }
        catch (Exception e)
        {
            //_logger.LogError(e, "Error getting user data.");
            return NotFound("Error getting user data.");
        }
    }
}