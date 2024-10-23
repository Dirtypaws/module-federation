using System.Text.Json.Serialization;
using Core.Controllers;
using Core.Models;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

app.MapGet("/todos", async () => { return await TodosController.Get(); });
app.MapGet("/todos/{id}", async (int id) => { return await TodosController.Get(id); });

app.Run();



[JsonSerializable(typeof(Todo[]))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}
