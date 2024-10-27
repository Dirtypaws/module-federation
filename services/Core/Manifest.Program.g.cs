
using Core.Controllers;

namespace Core;

internal static class Manifest
{
  private static readonly IManifestController _controller;

  static Manifest()
  {
    _controller = new ManifestController();
  }
  internal static void UseManifestController(this WebApplication app) { 
    app.MapGet("/manifest", async () => { return await _controller.Get(); });
  }
}