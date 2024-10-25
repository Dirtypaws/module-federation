
using Core.Models;

namespace Core.Controllers;

public static class ManifestController
{
  public static async Task<IResult> Get() 
  {
    // TODO: Get from Db
    var result = new Dictionary<string, ManifestDto>() {
      { "admin", new ManifestDto("http://localhost:4201/remoteEntry.js", RemoteType.Module, Guid.NewGuid(), "EntryModule", "./Module", "Admin", "admin", "0.0.1-alpha", [ new NavigationRouteDto("/versions", "Application Versions")])}
    };
    return Results.Ok(result);
  }

}
