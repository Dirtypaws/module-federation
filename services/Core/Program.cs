using Core.Handlers;

var builder = WebApplication.CreateBuilder(args);

// Add AWS Lambda support. When application is run in Lambda Kestrel is swapped out as the web server with Amazon.Lambda.AspNetCoreServer. This
// package will act as the webserver translating request and responses between the Lambda event source and ASP.NET Core.
builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);

var app = builder.Build();

app.UseHttpsRedirection();

// TODO: Map this to Auth0
app.UseAuthorization();

// TODO: Make this a Swagger page
app.MapGet("/", () => "Welcome to running ASP.NET Core Minimal API on AWS Lambda");

// TODO: AutoGenerate this from OpenAPI
app.MapGet("/manifest", () => ManifestHandler.Get);
app.MapPut("/manifest", () => ManifestHandler.Put);

app.Run();
