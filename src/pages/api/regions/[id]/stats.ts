import { withErrorHandling } from '@/middleware/error-handler.middleware';
import { findRegionStatsService } from '@/util/injection-container';

export default withErrorHandling(async (req, res) => {
  const { id } = req.query;
  const stats = await findRegionStatsService.execute({
    regionId: id as string,
  });

  res.status(200).json(stats);
});
