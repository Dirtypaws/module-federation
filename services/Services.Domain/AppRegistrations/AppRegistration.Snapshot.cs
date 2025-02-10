using Core.Client.Models;
using Semantics.Modeling.Domain;

namespace Services.Domain.AppRegistrations
{
    public partial class AppRegistration
    {
        private void Apply(Snapshot snapshot)
        {
            _displayName = snapshot.DisplayName;
            _exposedModule = snapshot.ExposedModule;
            _routes = snapshot.NavigationRoutes;
            _ngModule = snapshot.NgModuleName;
            _remoteEntry = snapshot.RemoteEntry;
            _path = snapshot.RoutePath;
            _type = snapshot.Type;
        }

        public record Snapshot(Id Id, int Version, string DisplayName, string ExposedModule,
             NavigationRoute[] NavigationRoutes, string NgModuleName,
             string RemoteEntry, string RoutePath, AppRegistrationType Type) : AggregateSnapshot<Id>(Id, Version, DateTime.UnixEpoch);
    }
}
