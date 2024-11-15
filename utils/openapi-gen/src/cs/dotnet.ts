import * as fs from 'fs';
import { OperationObject, PathItemObject } from 'openapi-typescript';

export class Dotnet {
  static buildController(path: string, pathItem: PathItemObject, outDir: string, project: string) {
    const controller = path.substring(1).charAt(0).toUpperCase() + path.slice(2);

    this.generateControllerInterface(controller, pathItem, outDir, project);
    if (!fs.existsSync(`${outDir}/${controller}Controller.cs`)) {
      this.generateBaseController(controller, outDir, project);
    }

    this.registerProgram(path, pathItem, project, controller);
    if (!fs.existsSync(`./Program.${controller}.ctor.cs`)) {
      this.buildConstructorFile(project, controller);
    }
  }

  private static generateBaseController(controller: string, outDir: string, project: string) {
    const baseController = `${outDir}/${controller}Controller.cs`;
    let controllerCode = `
using ${project}.Client.Models;

namespace ${project}.Controllers;

public class ${controller}Controller : I${controller}Controller
{
}`;
    fs.writeFileSync(baseController, controllerCode);
  }

  private static generateControllerInterface(
    controller: string,
    pathItem: PathItemObject,
    outDir: string,
    project: string,
  ) {
    const interfaceFile = `${outDir}/I${controller}Controller.g.cs`;
    let interfaceCode = `
using ${project}.Client.Models;

namespace ${project}.Controllers;

public interface I${controller}Controller
{`;
    const verbs = Object.entries(pathItem);
    verbs.forEach((verb) => {
      const operation = verb[1] as OperationObject;
      if (operation.operationId) {
        interfaceCode += `
  Task<IResult> ${operation.operationId}();`;
      }
    });

    interfaceCode += `
}`;
    fs.writeFileSync(interfaceFile, interfaceCode);
  }

  private static registerProgram(path: string, pathItem: PathItemObject, project: string, controller: string) {
    const filePath = `Program.${controller}.g.cs`;
    let code = `
using ${project}.Controllers;

namespace ${project};

internal static partial class ${controller}
{
  private static readonly IManifestController _controller;

  internal static void Use${controller}Controller(this WebApplication app) {
    `;
    const verbs = Object.entries(pathItem);
    verbs.forEach((verb) => {
      const method = verb[0].charAt(0).toUpperCase() + verb[0].slice(1);
      const definition = verb[1] as OperationObject;
      if (definition) {
        code += `app.Map${method}("${path}", async () => { return await _controller.${definition.operationId}(); });`;
      }
    });
    code += `
  }
}`;
    fs.writeFileSync(`./${filePath}`, code);
  }

  private static buildConstructorFile(project: string, controller: string) {
    const filePath = `Program.${controller}.ctor.cs`;
    let code = `
using ${project}.Controllers;

namespace ${project};

internal static partial class ${controller}
{

  static ${controller}()
  {
    // TODO: Register any dependencies here...
    _controller = new ${controller}Controller();
  }
}`;
    fs.writeFileSync(`./${filePath}`, code);
  }
}
