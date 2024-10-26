using Core.Controllers;

#pragma warning disable IDE0130 // This allows for nesting - and I'd rather have the filename match the pattern
namespace Core.Program;
#pragma warning restore IDE0130 // This allows for nesting - and I'd rather have the filename match the pattern

internal static class Manifest
{
  internal static void UseManifestController(this WebApplication app) {
    app.MapGet("/manifest", async () => { return await ManifestController.Get(); });
  }
}

