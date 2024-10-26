import ts, { ListFormat } from 'typescript';
import * as fs from 'fs';
import { DocumentParts, documentPrinter } from './endpoint.definitions';

export function writeFunctionHandler(filename: string, verb: string): void {
  const file = ts.createSourceFile(filename, '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  fs.writeFileSync(filename, documentPrinter.printList(ListFormat.MultiLine, DocumentParts.document(verb), file), {
    flag: 'w',
  });
}
