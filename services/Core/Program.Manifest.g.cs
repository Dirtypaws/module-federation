
using Core.Controllers;

namespace Core;

internal static partial class Manifest
{
  private static readonly IManifestController _controller;

  internal static void UseManifestController(this WebApplication app) {
    app.MapGet("/manifest", async () => { return await _controller.Get(); });
  }
}