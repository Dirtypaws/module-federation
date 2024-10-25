using System.Text.Json.Serialization;

namespace Core.Models
{
    public record ManifestDto(string RemoteEntry, [property: JsonConverter(typeof(JsonStringEnumConverter<RemoteType>))]RemoteType Type, Guid Id, string NgModuleName, string ExposedModule, string DisplayName, string RoutePath, string Version, NavigationRouteDto[] NavigationRoutes)
    {

    }

    public record NavigationRouteDto(string Path, string Display)
    {

    }
}