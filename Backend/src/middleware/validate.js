import { ZodError } from 'zod';

export function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.issues.map((i) => ({
          field: i.path.join('.') || source,
          message: i.message,
        }));
        return res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Input tidak valid.',
            details,
          },
        });
      }
      next(err);
    }
  };
}

export default validate;
