using Core.Client.Models;

namespace Services.Domain.AppRegistrations.Repositories
{
    public class QueryRepository
    {
        private static readonly Dictionary<string, AppRegistrationDto> _inMemory = new()
        {
            {
                "admin", new AppRegistrationDto(
                    "Admin",
                    "./Module",
                    Guid.NewGuid().ToString(),
                    [new ("Application Versions", "/versions")],
                    "EntryModule",
                    "http://localhost:4201/remoteEntry.js",
                    "admin",
                    AppRegistrationType.Module,
                    "0.0.1-alpha"
                )

            }
        };
        public async Task<Dictionary<string, AppRegistrationDto>> Get()
        {
            return _inMemory;
        }

        public async Task<AppRegistrationDto?> GetByName(string name)
        {
            return _inMemory.FirstOrDefault(p => p.Key == name).Value ?? null;
        }
    }
}
