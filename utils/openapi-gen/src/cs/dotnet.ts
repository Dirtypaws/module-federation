import * as fs from 'fs';
import {
  MediaTypeObject,
  OperationObject,
  ParameterObject,
  PathItemObject,
  PathsObject,
  ReferenceObject,
  RequestBodyObject,
  SchemaObject,
} from 'openapi-typescript';
import { ControllerType } from './dotnet.definition';

export class Dotnet {
  static buildControllers(pathsObject: PathsObject, outDir: string, project: string) {
    const controllers: Record<string, OperationObject[]> = {};
    Object.entries(pathsObject).forEach((path) => {
      const pathItem = path[1] as PathItemObject;
      const pathsItem = Object.entries(pathItem);

      for (const pathItem in pathsItem) {
        const operation = pathsItem[pathItem][1] as OperationObject;
        const controller = operation.tags ? operation.tags[0] : 'Unmatched';
        if (!controllers[controller]) {
          controllers[controller] = [operation];
        } else {
          controllers[controller].push(operation);
        }
      }
    });

    for (const controller in controllers) {
      if (Object.prototype.hasOwnProperty.call(controllers, controller)) {
        this.buildController(controller, controllers[controller], outDir, project);
      }
    }
  }

  static registerEndpoints(pathsObject: PathsObject, outDir: string, project: string) {
    const controllers: ControllerType = {};
    Object.entries(pathsObject).forEach((pathObject) => {
      Object.entries(pathObject[1] as PathItemObject).forEach((pathItem) => {
        const operation = pathItem[1] as OperationObject;
        const controller = operation.tags ? operation.tags[0] : 'Unmatched';
        if (!controllers[controller]) {
          controllers[controller] = {};
        }
        if (!controllers[controller][pathItem[0]]) {
          controllers[controller][pathItem[0]] = {
            path: pathObject[0],
            operations: [operation],
          };
        } else {
          controllers[controller][pathItem[0]].operations.push(operation);
        }
      });
    });

    Object.keys(controllers).forEach((controller) => {
      const filePath = `Program.${controller}.g.cs`;
      let code = `
using Core.Client.Models;      
using ${project}.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ${project};

internal static partial class ${controller}
{
  private static readonly I${controller}Controller _controller;

  internal static void Use${controller}Controller(this WebApplication app) 
  {
    `;
      Object.entries(controllers[controller]).forEach(([verb, definition]) => {
        definition.operations.forEach((element) => {
          const method = element.operationId;
          if (!method) {
            throw new Error('Malformed openapi specification');
          }
          const params = element.parameters ? (element.parameters as ParameterObject[]) : [];
          const pathParams = params.map((param) => {
            const schema = param.schema as SchemaObject;
            if (schema) {
              return `${schema.type} ${param.name}`;
            }
          });

          if (element.requestBody) {
            const schema = ((element.requestBody as RequestBodyObject).content['application/json'] as MediaTypeObject)
              .schema as ReferenceObject;
            const refParts = schema.$ref.split('/');
            const className = refParts[refParts.length - 1];
            pathParams.push(`[FromBody]${className} body`);
            params.push({
              name: 'body',
              in: 'cookie',
            });
          }
          const args = pathParams.join(', ');
          code += `app.Map${verb.charAt(0).toUpperCase() + verb.slice(1)}("${
            definition.path
          }", async (${args}) => { return await _controller.${method}(${params
            .map((p) => p.name)
            .join(', ')}); });\r\n    `;
        });
      });
      code += `
  }
}`;
      fs.writeFileSync(`./${filePath}`, code);
    });
  }

  private static buildController(controller: string, operations: OperationObject[], outDir: string, project: string) {
    this.generateControllerInterface(controller, operations, outDir, project);
    this.generateBaseController(controller, outDir, project);
    this.buildConstructorFile(project, controller);
  }

  private static generateBaseController(controller: string, outDir: string, project: string) {
    const baseController = `${outDir}/${controller}Controller.cs`;
    if (fs.existsSync(baseController)) {
      return;
    }

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
    operations: OperationObject[],
    outDir: string,
    project: string,
  ) {
    const interfaceFile = `${outDir}/I${controller}Controller.g.cs`;
    let interfaceCode = `
using ${project}.Client.Models;

namespace ${project}.Controllers;

public interface I${controller}Controller
{`;
    operations.forEach((operation) => {
      const method = operation.operationId;
      if (!method) {
        throw new Error(`Unable to build interface for operation ${method}`);
      }
      const params = operation.parameters ? (operation.parameters as ParameterObject[]) : [];
      const pathParams = params.map((param) => {
        const schema = param.schema as SchemaObject;
        if (schema) {
          return `${schema.type} ${param.name}`;
        }
      });

      if (operation.requestBody) {
        const schema = ((operation.requestBody as RequestBodyObject).content['application/json'] as MediaTypeObject)
          .schema as ReferenceObject;
        const refParts = schema.$ref.split('/');
        const className = refParts[refParts.length - 1];
        pathParams.push(`${className} body`);
      }
      interfaceCode += `
  Task<IResult> ${method}(${pathParams.join(', ')}${''});`;
    });

    interfaceCode += `
}`;
    fs.writeFileSync(interfaceFile, interfaceCode);
  }

  private static buildConstructorFile(project: string, controller: string) {
    if (fs.existsSync(`./Program.${controller}.ctor.cs`)) {
      return;
    }
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
