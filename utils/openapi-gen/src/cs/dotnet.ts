import * as fs from 'fs';

export class Dotnet {
  static createController(controller: string, method: string, output: string, project: string): void {
    console.log('checking for file...');
    if (fs.existsSync(`${output}/${controller}.cs`)) {
      // TODO: Open the file for editing and ensure the path exists.
      return;
    }

    const code = `
using ${project}.Client.Models;

namespace ${project}.Controllers;

public static class ${controller}
{
  static ${controller}()
  {
    // TODO: Instantiate Data Access layer and event handlers here
  }
  public static async Task<IResult> ${method}() 
  {
    throw new NotImplementedException();
  }
}`;
    console.log('writing file...');
    fs.writeFileSync(`${output}/${controller}.cs`, code);
  }
}
