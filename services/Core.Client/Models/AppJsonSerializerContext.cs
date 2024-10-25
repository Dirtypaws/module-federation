using System.Text.Json.Serialization;
using Core.Client.Models;

namespace Core.Internal.Models;

[JsonSerializable(typeof(ManifestDto))]
[JsonSerializable(typeof(Dictionary<string, ManifestDefinitionDto>))]
[JsonSerializable(typeof(NavigationDto))]
public partial class AppJsonSerializerContext : JsonSerializerContext
{

}