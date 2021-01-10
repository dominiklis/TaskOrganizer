using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.DTOs.Users;
using api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public UsersController(
            UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager, 
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("SignUp")]
        public async Task<ActionResult<UserToken>> SignUp([FromBody] UserInfoDTO signUpUser)
        {
            if (signUpUser.Password != signUpUser.RepeatPassword)
            {
                return BadRequest("passwords are different");
            }

            var user = new ApplicationUser { UserName = signUpUser.Email, Email = signUpUser.Email };
            var result = await _userManager.CreateAsync(user, signUpUser.Password);

            if (result.Succeeded)
            {
                return BuildToken(signUpUser);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        private UserToken BuildToken(UserInfoDTO signUpUser)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, signUpUser.Email),
                new Claim(ClaimTypes.Email, signUpUser.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expirationTime = DateTime.UtcNow.AddHours(6);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expirationTime,
                signingCredentials: creds);

            return new UserToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                UserName = signUpUser.Email,
                Expiration = expirationTime
            };
        }

        [HttpPost("SignIn")]
        public async Task<ActionResult<UserToken>> SignIn([FromBody] UserInfoDTO userInfo)
        {
            var result = await _signInManager.PasswordSignInAsync(userInfo.Email, userInfo.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return BuildToken(userInfo);
            }
            else
            {
                return BadRequest("incorrect email or password");
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("RenewToken")]
        public ActionResult<UserToken> RenewToken()
        {
            UserInfoDTO userInfo = new UserInfoDTO()
            {
                Email = HttpContext.User.Identity.Name
            };

            return BuildToken(userInfo);
        }
    }
}
