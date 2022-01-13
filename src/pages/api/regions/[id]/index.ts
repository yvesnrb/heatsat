import { withErrorHandling } from '@/middleware/error-handler.middleware';
import { findRegionService } from '@/util/injection-container';

export default withErrorHandling(async (req, res) => {
  const { id } = req.query;
  const region = await findRegionService.execute({ _id: id as string });

  if (!region) {
    res.status(404).end();
    return;
  }

  res.status(200).json(region);
});
