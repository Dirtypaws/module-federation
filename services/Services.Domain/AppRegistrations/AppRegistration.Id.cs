namespace Services.Domain.AppRegistrations
{
    public partial class AppRegistration
    {
        public sealed record Id(Guid Identifier, string Name);
    }
}
