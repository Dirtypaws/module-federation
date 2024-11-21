import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { OpenAPI3, PathItemObject, PathsObject } from 'openapi-typescript';
import { Dotnet } from './cs/dotnet';

export async function parseSpec(path: string, outDir: string, language: string, project: string): Promise<void> {
  if (!fs.existsSync(path)) {
    throw Error(`The file at path ${path} could not be found`);
  }

  if (outDir.endsWith('/')) {
    outDir = outDir.slice(0, -1);
  }
  const file = fs.readFileSync(path, 'utf-8');
  const spec = yaml.load(file) as OpenAPI3;
  if (!spec) {
    throw Error('The supplied openapi spec was not in the proper format');
  }

  switch (language) {
    case 'ts':
      processTypescriptEndpoints(spec, outDir);
      break;
    case 'cs':
      processDotnetEndpoints(spec, outDir, project);
      break;
    default:
      console.log('The supplied language is not supported');
      break;
  }
}

function processTypescriptEndpoints(spec: OpenAPI3, outDir: string) {
  const pathObject = spec.paths as PathsObject;
  const paths = Object.keys(pathObject);
  if (!paths) {
    throw new Error('Paths could not be parsed from the OpenApi spec');
  }

  paths.forEach((path) => {
    const pathItem = pathObject[path] as PathItemObject;
    const verbs = Object.entries(pathItem);

    verbs.forEach(([_key, entry]) => {
      console.log(entry);
    });
  });
}

function processDotnetEndpoints(spec: OpenAPI3, outDir: string, project: string) {
  const pathObject = spec.paths as PathsObject;
  Dotnet.buildControllers(pathObject, outDir, project);
  Dotnet.registerEndpoints(pathObject, outDir, project);
}
