import * as fs from 'fs';

export class Dotnet {
  static createController(controller: string, method: string, output: string, project: string): void {
    const filePath = `${output}/I${controller}.g.cs`;
    const code = `
using ${project}.Client.Models;

namespace ${project}.Controllers;

public interface I${controller}
{
  Task<IResult> ${method}();
}`;

    fs.writeFileSync(filePath, code);
  }

  static registerProgram(project: string, path: string, verbs: string[]) {
    const controller = path.substring(1).charAt(0).toUpperCase() + path.slice(2);
    const filePath = `${controller}.Program.g.cs`;

    let code = `
using ${project}.Controllers;

namespace ${project};

internal static class ${controller}
{
  private static readonly I${controller}Controller _controller;

  static ${controller}()
  {
    _controller = new ${controller}Controller();
  }
  internal static void Use${controller}Controller(this WebApplication app) { 
    `;

    verbs.forEach((verb) => {
      code += `app.MapGet("${path}", async () => { return await _controller.${
        verb.charAt(0).toUpperCase() + verb.slice(1)
      }(); });`;
    });

    code += `
  }
}`;

    fs.writeFileSync(`./${filePath}`, code);
  }
}