import { OperationObject } from 'openapi-typescript';

export interface VerbDefinition {
  path: string;
  operations: OperationObject[];
}

export type EndpointDefinition = Record<string, VerbDefinition>;
export type ControllerType = Record<string, EndpointDefinition>;
