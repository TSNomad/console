# @tsnomad/console

The interfaces a nomadic CLI command implements: a `Command` with a name, a
description, and a handler, an `Input` for reading parsed parameters, and an
`OutputStrategy` for writing lines, tables, and status messages. The types
lean on commander for parsing, which stays an optional peer dependency.

This is the TypeScript counterpart to PHPNomad's
[console](https://github.com/phpnomad/console) package, the framework that
TSNomad follows in shape and naming.

## Install

```bash
npm install @tsnomad/console commander
```

## Use

```ts
import type { Command, Input, OutputStrategy } from '@tsnomad/console';

class WatchCommand implements Command {
  getName() { return 'watch'; }
  getDescription() { return 'Watch for changes'; }
  configure(cmd) { /* add options here */ }
  async handle(input: Input, output: OutputStrategy) {
    output.info('Starting watch...');
    return 0;
  }
}
```

## Extracted 2026-09-17

This package was extracted on 2026-09-17 from a prototype carried inside
three Novatorius CLIs.

## License

MIT.
