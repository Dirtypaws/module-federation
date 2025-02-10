using Semantics;
using Semantics.Modeling.Domain;

namespace Services.Domain.AppRegistrations.Repositories
{
    public class CommandRepository(QueryRepository queryRepo, IEventHandler[] handlers) : EventHandlerRepository<AppRegistration, AppRegistration.Id>(handlers)
    {
        protected override async Task<IAggregateSnapshot<AppRegistration.Id>> GetSnapshotFromStore(AppRegistration.Id id, int maxVersion)
        {
            var manifest = await queryRepo.Get() ?? throw new NullReferenceException("Manifest data could not be retrieved");
            if (!manifest.TryGetValue(id.Name, out var value))
            {
                value ??= manifest.Values.FirstOrDefault(_ => _.Id == id.Identifier.ToString());
            }

            if (value == null)
                throw new ArgumentException($"Could not find app registration by ('{id.Identifier}-{id.Name}");

            return new AppRegistration.Snapshot(id, int.Parse(value.Version), value.DisplayName, value.ExposedModule, value.NavigationRoutes.Select(_ => new NavigationRoute(_.Display, _.Path)).ToArray(), value.NgModuleName, value.RemoteEntry, value.RoutePath, value.Type);
        }
    }
}