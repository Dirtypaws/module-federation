using Core.Client.Models;
using Semantics;
using Semantics.Modeling.Domain;

namespace Core.Domain.AppRegistrations
{
    public partial class AppRegistration : Aggregate<AppRegistration.Id>
    {
        private string _displayName;
        private string _exposedModule;
        private NavigationRoute[] _routes;
        private string _ngModule;
        private string _remoteEntry;
        private string _path;
        private AppRegistrationType _type;

        public AppRegistration(Guid id, string displayName, string exposedModule, NavigationRoute[] routes, string ngModule, string remoteEntry, string path, AppRegistrationType type)
        {
            _displayName = displayName;
            _exposedModule = exposedModule;
            _routes = routes;
            _ngModule = ngModule;
            _remoteEntry = remoteEntry;
            _path = path;
            _type = type;

            ApplyEvent(new Created(new Id(id, _displayName), 1, _displayName, _exposedModule, _routes, _ngModule, _remoteEntry, _path, _type));
        }
    }
}
