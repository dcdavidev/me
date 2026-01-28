import z from 'zod';

export const jwtSecretSchema = z.string();

export type JwtSecret = z.infer<typeof jwtSecretSchema>;

export const JWT_SECRET = (() => {
  const parsed = jwtSecretSchema.safeParse(process.env.JWT_SECRET);

  if (!parsed.success) {
    throw new Error('Invalid JWT_SECRET value', { cause: parsed.error });
  }

  return parsed.data;
})();
