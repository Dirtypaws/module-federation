
using Core.Client.Models;

namespace Core.Controllers;

public interface IAppController
{
  Task<IResult> Get();
  Task<IResult> Create(CreateAppRegistrationDto body);
  Task<IResult> GetByName(string application);
}