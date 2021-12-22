import { NextApiHandler } from 'next';

import { AppError } from '@/util/app-error';

export function errorHandlerHOF(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      if (e instanceof AppError) {
        console.error(e.message);
        res.status(e.statusCode).end();
      } else if (e instanceof Error) {
        console.error(e.message);
        res.status(500).end();
      } else {
        res.status(500).end();
      }
    }
  };
}
