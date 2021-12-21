import type { NextApiRequest, NextApiResponse } from 'next';

import { IngestLatestDataService } from '@/services/ingest-latest-data.service';
import { InpeProvider } from '@/providers/inpe.provider';
import { GeodecoderProvider } from '@/providers/geodecoder.provider';
import { FindIngestedDataQuery } from '@/queries/find-ingested-data.query';
import { CreateIngestedDataCommand } from '@/commands/create-ingested-data.command';
import { FindZoneQuery } from '@/queries/find-zone.query';
import { CreateDataPoints } from '@/commands/create-data-points.command';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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

    res.status(200).json({});
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
    res.status(500).json({});
  }
}
