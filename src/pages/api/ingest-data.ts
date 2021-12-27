import { withAuth } from '@/middleware/auth.middleware';
import { withErrorHandling } from '@/middleware/error-handler.middleware';
import { ingestLatestDataService } from '@/util/injection-container';

export default withErrorHandling(
  withAuth(async (_req, res) => {
    await ingestLatestDataService.execute();

    res.status(204).end();
  })
);
