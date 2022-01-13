import * as yup from 'yup';

import { withErrorHandling } from '@/middleware/error-handler.middleware';
import { withValidation } from '@/middleware/validator.middleware';
import { listRegionsService } from '@/util/injection-container';

const querySchema = yup.object({
  countryId: yup.string().required(),
});

export default withErrorHandling(
  withValidation({ query: querySchema }, async (req, res) => {
    const { countryId } = req.query;
    const regions = await listRegionsService.execute({
      countryId: countryId as string,
    });

    res.status(200).json(regions);
  })
);
