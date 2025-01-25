
using Core.Client.Models;      
using Core.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Core;

internal static partial class App
{
  private static readonly IAppController _controller;

  internal static void UseAppController(this WebApplication app) 
  {
    app.MapGet("/app", async () => { return await _controller.Get(); });
    app.MapGet("/app", async (string application) => { return await _controller.GetByName(application); });
    app.MapPost("/app", async ([FromBody]CreateAppRegistrationDto body) => { return await _controller.Create(body); });
    
  }
}