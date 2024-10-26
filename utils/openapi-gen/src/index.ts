import { Command } from 'commander';
import figlet from 'figlet';
import path from 'path';
import { parseSpec } from './OpenapiParser';

const program = new Command();

console.log(
  figlet.textSync('API Generation', {
    font: 'Nancyj-Improved',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    whitespaceBreak: true,
  }),
);

program
  .version('1.0.0')
  .description(
    'An api generation tool that takes the file at `./_openapi.yaml` and outputs Azure function stubs for easy implementation.',
  )
  .option('-f, --file [value]', 'Optional: Override file containing openapi spec.', '../../src/openapi/_openapi.yaml')
  .option('-o, --outputDir [value]', 'Optional: Override the directory for generated content', '../../src/functions')
  .option('-l, --language [value]', 'Language target for the output controllers')
  .option('-p, --project [value]', 'The target project name, used for namespace and using declarations in cs')
  .parse(process.argv);

const options = program.opts();

// eslint-disable-next-line @typescript-eslint/no-floating-promises
parseSpec(path.resolve(options.file), path.resolve(options.outputDir), options.language, options.project);
