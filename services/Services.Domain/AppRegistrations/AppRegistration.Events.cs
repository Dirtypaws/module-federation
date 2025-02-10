using Core.Client.Models;
using Semantics.Modeling.Domain;

namespace Services.Domain.AppRegistrations
{
    public partial class AppRegistration
    {
        public record Created(
            Id id,
            int version,
            string DisplayName,
            string ExposedModule,
            NavigationRoute[] NavigationRoutes,
            string NgModuleName,
            string RemoteEntry,
            string RoutePath,
            AppRegistrationType Type) : AggregateEvent<Id>(id, version);
    }
}
