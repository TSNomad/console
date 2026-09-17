/**
 * TSNomad Console Types
 *
 * Console abstraction following the PHPNomad pattern.
 * Uses commander for CLI parsing with adapter pattern for testability.
 */

import type { Command as CommanderCommand } from 'commander';

/**
 * Command interface for CLI commands.
 * Commands use commander directly for configuration, with abstracted
 * Input/Output for testability.
 *
 * @example
 * ```typescript
 * class WatchCommand implements Command {
 *   getName(): string {
 *     return 'watch';
 *   }
 *
 *   getDescription(): string {
 *     return 'Watch for milestone changes';
 *   }
 *
 *   configure(cmd: CommanderCommand): void {
 *     cmd.option('--manifest <file>', 'Manifest file to load');
 *   }
 *
 *   async handle(input: Input, output: OutputStrategy): Promise<number> {
 *     output.info('Starting watch...');
 *     return 0;
 *   }
 * }
 * ```
 */
export interface Command {
  /**
   * Returns the command name (e.g., 'watch', 'run').
   */
  getName(): string;

  /**
   * Returns human-readable description shown in help.
   */
  getDescription(): string;

  /**
   * Configure the commander command with options and arguments.
   * Called during command registration.
   */
  configure(cmd: CommanderCommand): void;

  /**
   * Execute the command.
   * Returns exit code (0 = success, non-zero = failure).
   */
  handle(input: Input, output: OutputStrategy): Promise<number>;
}

/**
 * Input abstraction for accessing command parameters.
 * Wraps parsed command-line arguments and options.
 */
export interface Input {
  /**
   * Get a parameter value by name.
   * Returns defaultValue if parameter is not set.
   */
  getParam<T = string>(name: string, defaultValue?: T): T;

  /**
   * Check if a parameter was provided.
   */
  hasParam(name: string): boolean;

  /**
   * Get all parameters as a record.
   */
  getParams(): Record<string, unknown>;
}

/**
 * Output strategy for writing to console.
 * Provides semantic methods for different output types.
 * Returns `this` for method chaining.
 */
export interface OutputStrategy {
  /**
   * Write a line of text.
   */
  writeln(message: string): this;

  /**
   * Write an informational message.
   */
  info(message: string): this;

  /**
   * Write a success message.
   */
  success(message: string): this;

  /**
   * Write a warning message.
   */
  warning(message: string): this;

  /**
   * Write an error message.
   */
  error(message: string): this;

  /**
   * Write a formatted table.
   */
  table(headers: string[], rows: unknown[][]): this;
}

/**
 * Console strategy interface (adapter pattern).
 * Abstracts the CLI framework from commands for testability.
 */
export interface ConsoleStrategy {
  /**
   * Register a command with the console.
   * Uses getter function for lazy instantiation via container.
   */
  registerCommand(commandGetter: () => Command): void;

  /**
   * Run the console, parsing args and executing commands.
   * Returns exit code from the executed command.
   */
  run(): Promise<number>;
}
