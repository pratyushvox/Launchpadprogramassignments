import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';

const validate = (schema: AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      const errors = error.inner.map((err: any) => ({
        field: err.path,
        message: err.message
      }));
      res.status(400).json({ errors });
    }
  };
};

export default validate;