import ts, { FunctionDeclaration, SyntaxKind } from 'typescript';
const factory = ts.factory;

class Identifiers {
  static request = factory.createIdentifier('request');
  static context = factory.createIdentifier('context');
  static httpRequest = factory.createIdentifier('HttpRequest');
  static invocationContext = factory.createIdentifier('InvocationContext');
  static httpRequestInit = factory.createIdentifier(`HttpResponseInit`);
  static err = factory.createIdentifier('err');

  static create(id: string): ts.Identifier {
    return factory.createIdentifier(id);
  }
}

class FunctionParts {
  static modifiers = [
    factory.createModifier(SyntaxKind.ExportKeyword),
    factory.createModifier(SyntaxKind.AsyncKeyword),
  ];

  private static contextParameter = factory.createParameterDeclaration(
    undefined,
    undefined,
    Identifiers.context,
    undefined,
    factory.createExpressionWithTypeArguments(Identifiers.invocationContext, undefined),
  );

  private static requestParameter = factory.createParameterDeclaration(
    undefined,
    undefined,
    Identifiers.request,
    undefined,
    factory.createExpressionWithTypeArguments(Identifiers.httpRequest, undefined),
  );

  private static errResponse = factory.createReturnStatement(
    factory.createObjectLiteralExpression(
      [
        factory.createPropertyAssignment('status', factory.createNumericLiteral(500)),
        factory.createPropertyAssignment('body', factory.createStringLiteral('An unexpected error occurred.', true)),
      ],
      true,
    ),
  );

  private static successResponse = factory.createReturnStatement(
    factory.createObjectLiteralExpression(
      [
        factory.createPropertyAssignment('status', factory.createNumericLiteral(501)),
        factory.createPropertyAssignment('body', factory.createStringLiteral('Not implemented yet!', true)),
      ],
      true,
    ),
  );

  private static catch = factory.createCatchClause(Identifiers.err, factory.createBlock([this.errResponse], true));

  static tryCatchBlock = factory.createTryStatement(
    factory.createBlock([this.successResponse], true),
    this.catch,
    undefined,
  );
  static parameters = [this.contextParameter, this.requestParameter];
  static returnType = factory.createTypeReferenceNode('Promise<HttpResponseInit>');
}

const azureImports = [
  factory.createImportSpecifier(false, undefined, Identifiers.httpRequest),
  factory.createImportSpecifier(false, undefined, Identifiers.httpRequestInit),
  factory.createImportSpecifier(false, undefined, Identifiers.invocationContext),
];

const namedImports = factory.createImportClause(false, undefined, factory.createNamedImports(azureImports));

export class DocumentParts {
  private static newLine = factory.createIdentifier('\n');

  private static imports = factory.createImportDeclaration(
    undefined,
    namedImports,
    factory.createStringLiteral(`@azure/functions`, true),
  );

  private static function = (verb: string): FunctionDeclaration =>
    factory.createFunctionDeclaration(
      FunctionParts.modifiers,
      undefined,
      Identifiers.create(verb),
      undefined,
      FunctionParts.parameters,
      FunctionParts.returnType,
      factory.createBlock([FunctionParts.tryCatchBlock], true),
    );

  static document = (verb: string) =>
    factory.createNodeArray([DocumentParts.imports, DocumentParts.newLine, DocumentParts.function(verb)]);
}

export const documentPrinter = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
