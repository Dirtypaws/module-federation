using Core.Controllers;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

app.MapGet("/todos", async () => { return await TodosController.Get(); });
app.MapGet("/todos/{id}", async (int id) => { return await TodosController.Get(id); });

app.Run();
