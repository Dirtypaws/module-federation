using System.Text.Json;
using Core.Controllers;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(static options =>
{
    options.SerializerOptions.IncludeFields = true;
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

builder.Logging.ClearProviders();
builder.Logging.AddJsonConsole(options => {
    options.IncludeScopes = true;
    options.UseUtcTimestamp = true;
    options.TimestampFormat  = "hh:mm:ss";
});

var app = builder.Build();

app.MapGet("/manifest", async () => { return await ManifestController.Get(); });

app.Run();
