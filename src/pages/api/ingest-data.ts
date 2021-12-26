import { IngestLatestDataService } from '@/services/ingest-latest-data.service';
import { InpeProvider } from '@/providers/inpe.provider';
import { GeodecoderProvider } from '@/providers/geodecoder.provider';
import { FindIngestedDataQuery } from '@/queries/find-ingested-data.query';
import { CreateIngestedDataCommand } from '@/commands/create-ingested-data.command';
import { FindZoneQuery } from '@/queries/find-zone.query';
import { CreateDataPoints } from '@/commands/create-data-points.command';
import { withAuth } from '@/middleware/auth.middleware';
import { withErrorHandling } from '@/middleware/error-handler.middleware';

export default withErrorHandling(
  withAuth(async (_req, res) => {
    const inpeProvider = new InpeProvider();
    const geodecoderProvider = new GeodecoderProvider();
    const findIngestedDataQuery = new FindIngestedDataQuery();
    const findZoneQuery = new FindZoneQuery();
    const createIngestedDataCommand = new CreateIngestedDataCommand();
    const createDataPoints = new CreateDataPoints();

    const ingestLatestData = new IngestLatestDataService(
      inpeProvider,
      geodecoderProvider,
      findIngestedDataQuery,
      findZoneQuery,
      createIngestedDataCommand,
      createDataPoints
    );

    await ingestLatestData.execute();

    res.status(204).end();
  })
);
