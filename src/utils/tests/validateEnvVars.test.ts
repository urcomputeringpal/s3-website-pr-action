import validateEnvVars from '../validateEnvVars';

process.env.ENV_VAR_1 = 'Hello';
process.env.ENV_VAR_2 = 'World';

describe('validateEnvVars', () => {
  test('should return true when required env var present', () => {
    expect(validateEnvVars(['ENV_VAR_1'])).toBe(true);
  });

  test('should return true when required env vars present', () => {
    expect(validateEnvVars(['ENV_VAR_1', 'ENV_VAR_2'])).toBe(true);
  });

  test('should throw when required env var missing', () => {
    expect(() => validateEnvVars(['ENV_VAR_3'])).toThrow();
  });

  test('should throw when one required env var is present and one missing', () => {
    expect(() => validateEnvVars(['ENV_VAR_1', 'ENV_VAR_3'])).toThrow();
  });

  test('should throw when multiple required env var missing', () => {
    expect(() => validateEnvVars(['ENV_VAR_3', 'ENV_VAR_4'])).toThrow();
  });
});
