import { NextApiHandler } from 'next';
import type { AnySchema } from 'yup';

import { AppError } from '@/util/app-error';

export interface IValidationSchemas {
  query?: AnySchema;
  body?: AnySchema;
}

export function withValidation(
  schemas: IValidationSchemas,
  handler: NextApiHandler
): NextApiHandler {
  const { query, body } = schemas;

  return async (req, res) => {
    const newReq = req;

    try {
      if (query)
        newReq.query = query.validateSync(req.query, { abortEarly: true });
      if (body) newReq.body = body.validateSync(req.body, { abortEarly: true });

      await handler(newReq, res);
    } catch {
      throw new AppError(400, 'withValidation: bad request.');
    }
  };
}
