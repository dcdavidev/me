import z from 'zod';

const nodeEnvSchema = z
  .union([z.literal('production'), z.literal('development')])
  .optional()
  .default('development');

export type NodeEnv = z.infer<typeof nodeEnvSchema>;
export type NodeEnvInput = z.input<typeof nodeEnvSchema>;
export type NodeEnvOutput = z.output<typeof nodeEnvSchema>;

export const NODE_ENV = (() => {
  const parsed = nodeEnvSchema.safeParse(process.env.NODE_ENV);

  if (!parsed.success) {
    throw new Error(
      'Invalid NODE_ENV value! Must be one of "production" or "development".'
    );
  }

  return parsed.data;
})();

export const PROD = NODE_ENV === 'production';
export const DEV = NODE_ENV === 'development';
