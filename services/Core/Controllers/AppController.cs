
using Core.Client.Models;
using Core.Domain.AppRegistrations;
using Core.Domain.AppRegistrations.Repositories;

namespace Core.Controllers;

public class AppController(QueryRepository queryRepository, CommandRepository commandRepository) : IAppController
{
    public async Task<IResult> Get()
    {
        var result = await queryRepository.Get();
        return Results.Ok(result);
    }

    public async Task<IResult> Create(CreateAppRegistrationDto body)
    {
        var id = Guid.NewGuid();

        var domain = new AppRegistration(id, body.DisplayName,
            body.ExposedModule, body.NavigationRoutes.Select(_ => new NavigationRoute(_.Display, _.Path)).ToArray(),
            body.NgModuleName, body.RemoteEntry, body.RoutePath, body.Type);

        await commandRepository.Save(domain);

        return Results.Created(string.Empty, id);
    }

    public async Task<IResult> GetByName(string application)
    {
        throw new NotImplementedException();
    }
}