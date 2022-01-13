import { withErrorHandling } from '@/middleware/error-handler.middleware';
import { listCountriesService } from '@/util/injection-container';

export default withErrorHandling(async (_req, res) => {
  const countries = await listCountriesService.execute();
  res.status(200).json(countries);
});
