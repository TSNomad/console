/**
 * @tsnomad/console
 *
 * Public entry point. Re-exports the console interfaces and error classes
 * so consumers can import everything from the package root.
 */

export type { Command, Input, OutputStrategy, ConsoleStrategy } from './types.js';
export {
  ConsoleError,
  CommandNotFoundError,
  CommandExecutionError,
  MissingParameterError,
  InvalidParameterError,
} from './errors.js';
