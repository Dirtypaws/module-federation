using System.Text.Json.Serialization;
using Core.Models;

[JsonSerializable(typeof(ManifestDto))]
[JsonSerializable(typeof(Dictionary<string, ManifestDto>))]
[JsonSerializable(typeof(NavigationRouteDto))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}