using System.Text.Json;
using Core.Internal.Models;
using Core.Program;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.AddCors();

builder.Services.ConfigureHttpJsonOptions(static _ =>
{
    _.SerializerOptions.IncludeFields = true;
    _.SerializerOptions.PropertyNameCaseInsensitive = true;
    _.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    _.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

builder.Logging.ClearProviders();
builder.Logging.AddJsonConsole(_ => {
    _.IncludeScopes = true;
    _.JsonWriterOptions = new JsonWriterOptions {
        Indented = true,
    };
    _.UseUtcTimestamp = true;
    _.TimestampFormat  = "hh:mm:ss";
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors(_ => _.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseManifestController();

app.Run();