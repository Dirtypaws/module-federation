import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { writeFunctionHandler } from './ts/EndpointCreator';
import { Dotnet } from './cs/dotnet';

export async function parseSpec(path: string, outDir: string, language: string, project: string): Promise<void> {
  if (!fs.existsSync(path)) {
    throw Error(`The file at path ${path} could not be found`);
  }

  if (outDir.endsWith('/')) {
    outDir = outDir.slice(0, -1);
  }
  const file = fs.readFileSync(path, 'utf-8');
  const { paths } = yaml.load(file) as Record<
    string,
    { [key: string]: { [key: string]: { operationId: string; tags: string[] } } }
  >;

  const pathArray = Object.entries(paths);
  pathArray.forEach(([path, verbs]) => {
    const verbArray = Object.entries(verbs);
    if (language === 'cs') {
      Dotnet.registerProgram(
        project,
        path,
        verbArray.flatMap(([key]) => key),
      );
    }
    verbArray.forEach(([verb, definition]) => {
      if (!definition.operationId) {
        return;
      }

      switch (language) {
        case 'ruby':
          processRubyEndpoints(outDir, definition.operationId, verb);
          break;
        case 'ts':
          processTypescriptEndpoints(outDir, definition.operationId, verb);
          break;
        case 'cs':
          processDotnetEndpoints(definition.tags[0], outDir, definition.operationId, project);
          break;
        default:
          break;
      }
    });
  });
}

function processTypescriptEndpoints(outDir: string, operationId: string, verb: string) {
  const directory = `${outDir}\\${operationId}`;
  fs.mkdirSync(directory, { recursive: true });

  writeFunctionHandler(`${directory}\\index.ts`, verb);
}

function processDotnetEndpoints(path: string, outDir: string, operationId: string, project: string) {
  const controller = `${path}Controller`;

  Dotnet.createController(controller, operationId, outDir, project);
}

function processRubyEndpoints(outDir: string, operationId: string, verb: string) {}