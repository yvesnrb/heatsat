import * as yup from 'yup';

import { withErrorHandling } from '@/middleware/error-handler.middleware';
import { withValidation } from '@/middleware/validator.middleware';
import { listDataPointsService } from '@/util/injection-container';

const querySchema = yup.object({
  timeframe: yup.number().oneOf([1, 6, 12]).default(1),
});

export default withErrorHandling(
  withValidation({ query: querySchema }, async (req, res) => {
    const { timeframe } = req.query;
    const dataPoints = await listDataPointsService.execute({
      timeframe: Number(timeframe) as any,
    });

    res.status(200).json(dataPoints);
  })
);
