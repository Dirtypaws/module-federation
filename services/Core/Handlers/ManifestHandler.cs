using System;
using Core.Helpers;
using System.Net;

namespace Core.Handlers;

public static class ManifestHandler
{
  static ManifestHandler()
  {
    // TODO: Inject handlers
    
  }
  public static async Task Get(HttpContext context)
  {
    await context.WriteResponse(HttpStatusCode.NotImplemented);
  }

  public static async Task Put(HttpContext context)
  {
    await context.WriteResponse(HttpStatusCode.NotImplemented);
  }
}
