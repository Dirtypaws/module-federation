using System.Text.Json.Serialization;
using Core.Client.Models;

namespace Core.Internal.Models;

[JsonSerializable(typeof(ManifestDto))]
[JsonSerializable(typeof(Dictionary<string, AppRegistrationDto>))]
[JsonSerializable(typeof(NavigationDto))]
[JsonSerializable(typeof(CreateAppRegistrationDto))]
public partial class AppJsonSerializerContext : JsonSerializerContext
{

}