/**
 * Console Error Classes
 *
 * Specific errors for console operations to enable targeted catch handling.
 */

/**
 * Base error for all console-related errors.
 */
export class ConsoleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConsoleError';
  }
}

/**
 * Thrown when a command is not found.
 */
export class CommandNotFoundError extends ConsoleError {
  constructor(
    public readonly commandName: string,
    public readonly availableCommands: string[]
  ) {
    const available = availableCommands.length > 0
      ? availableCommands.join(', ')
      : 'none';
    super(`Command '${commandName}' not found. Available: ${available}`);
    this.name = 'CommandNotFoundError';
  }
}

/**
 * Thrown when command execution fails.
 */
export class CommandExecutionError extends ConsoleError {
  constructor(
    public readonly commandName: string,
    public readonly cause: Error
  ) {
    super(`Command '${commandName}' failed: ${cause.message}`);
    this.name = 'CommandExecutionError';
  }
}

/**
 * Thrown when a required parameter is missing.
 */
export class MissingParameterError extends ConsoleError {
  constructor(
    public readonly parameterName: string,
    public readonly commandName: string
  ) {
    super(`Missing required parameter '${parameterName}' for command '${commandName}'`);
    this.name = 'MissingParameterError';
  }
}

/**
 * Thrown when a parameter value is invalid.
 */
export class InvalidParameterError extends ConsoleError {
  constructor(
    public readonly parameterName: string,
    public readonly value: unknown,
    public readonly reason: string
  ) {
    super(`Invalid value '${String(value)}' for parameter '${parameterName}': ${reason}`);
    this.name = 'InvalidParameterError';
  }
}
