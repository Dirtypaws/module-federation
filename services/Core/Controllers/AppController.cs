
using Core.Client.Models;
using Services.Domain.AppRegistrations;
using Services.Domain.AppRegistrations.Repositories;

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
            body.ExposedModule, body.NavigationRoutes.Select(n => new NavigationRoute(n.Display, n.Path)).ToArray(),
            body.NgModuleName, body.RemoteEntry, body.RoutePath, body.Type);

        await commandRepository.Save(domain);

        return Results.Created(string.Empty, id);
    }

    public async Task<IResult> GetByName(string application)
    {
        var result = await queryRepository.GetByName(application);
        return result == null ? Results.NotFound(application) : Results.Ok(result);
    }
}