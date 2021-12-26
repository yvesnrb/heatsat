import { NextApiHandler } from 'next';
import auth from 'basic-auth';

import { AppError } from '@/util/app-error';
import { basicAuth } from '@/util/config';

export function withAuth(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    const credentials = auth.parse(req.headers.authorization || '');

    if (!credentials) {
      res.setHeader('WWW-Authenticate', 'Basic');
      throw new AppError(401, 'withAuth: authorization failed.');
    }

    if (
      credentials.name !== basicAuth.name ||
      credentials.pass !== basicAuth.pass
    ) {
      res.setHeader('WWW-Authenticate', 'Basic');
      throw new AppError(401, 'withAuth: authorization failed.');
    }

    await handler(req, res);
  };
}
