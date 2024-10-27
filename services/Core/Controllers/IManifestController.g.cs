
using Core.Client.Models;

namespace Core.Controllers;

public interface IManifestController
{
  Task<IResult> Get();
}