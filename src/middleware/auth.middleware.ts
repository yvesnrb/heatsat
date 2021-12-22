import { NextApiRequest, NextApiResponse } from 'next';
import auth from 'basic-auth';

import { AppError } from '@/util/app-error';
import { basicAuth } from '@/util/config';

export function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const credentials = auth.parse(req.headers.authorization || '');

  if (!credentials) {
    res.setHeader('WWW-Authenticate', 'Basic');
    throw new AppError(401, 'authMiddleware: authorization failed.');
  }

  if (
    credentials.name !== basicAuth.name ||
    credentials.pass !== basicAuth.pass
  ) {
    res.setHeader('WWW-Authenticate', 'Basic');
    throw new AppError(401, 'authMiddleware: authorization failed.');
  }
}
