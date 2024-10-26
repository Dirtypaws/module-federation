using Core.Client.Models;

namespace Core.Controllers;

public static class ManifestController
{

  static ManifestController()
  {
    // TODO: Inject Data Access layer and event handlers here
  }
  public static async Task<IResult> Get() 
  {
    // TODO: Get from Db
    var result = new Dictionary<string, ManifestDefinitionDto>() {
      { 
        "admin", 
        new ManifestDefinitionDto(
          "Admin", 
          "./Module", 
          Guid.NewGuid().ToString(), 
          [new("Application Versions", "/versions")], 
          "EntryModule", 
          "http://localhost:4201/remoteEntry.js", 
          "admin", 
          ManifestDefinitionDtoType.Module, 
          "0.0.1-alpha"
        )
      }
    };
    return Results.Ok(result);
  }

}
