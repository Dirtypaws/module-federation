
using Core.Controllers;
using Core.Domain.AppRegistrations.Repositories;
using Semantics;

namespace Core;

internal static partial class App
{

    static App()
    {
        var queryRepository = new QueryRepository();
        // TODO: Register any dependencies here...
        _controller = new AppController(queryRepository, new CommandRepository(queryRepository, []));
    }
}