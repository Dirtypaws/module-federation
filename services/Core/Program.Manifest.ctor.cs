
using Core.Controllers;

namespace Core;

internal static partial class Manifest
{

  static Manifest()
  {
    // TODO: Register any dependencies here...
    _controller = new ManifestController();
  }
}