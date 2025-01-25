using Core.Client.Models;

namespace Core.Domain.AppRegistrations.Repositories
{
    public class QueryRepository
    {
        public async Task<Dictionary<string, AppRegistrationDto>> Get()
        {
            var result = new Dictionary<string, AppRegistrationDto>
            {
                {
                    "admin", new AppRegistrationDto(
                    "Admin",
                    "./Module",
                    Guid.NewGuid().ToString(),
                    [new("Application Versions", "/versions")],
                    "EntryModule",
                    "http://localhost:4201/remoteEntry.js",
                    "admin",
                    AppRegistrationType.Module,
                    "0.0.1-alpha"
                    )

                }
            };
            return result;
        }
    }
}
