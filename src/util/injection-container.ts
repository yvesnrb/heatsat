import { CreateDataPoints } from '@/commands/create-data-points.command';
import { CreateIngestedDataCommand } from '@/commands/create-ingested-data.command';
import { GeodecoderProvider } from '@/providers/geodecoder.provider';
import { InpeProvider } from '@/providers/inpe.provider';
import { FindIngestedDataQuery } from '@/queries/find-ingested-data.query';
import { FindZoneQuery } from '@/queries/find-zone.query';
import { ListDataPointsQuery } from '@/queries/list-data-points.query';
import { IngestLatestDataService } from '@/services/ingest-latest-data.service';
import { ListDataPointsService } from '@/services/list-data-points.service';

// This dependency handling was supposed to be done with tsyringe.
// Unfortunately, decorator support in SWC is still experimental. This file is
// a hack with a somewhat simmilar API so that porting in the future is easier
// (if I ever remember).

// Commands.
export const createDataPoints = new CreateDataPoints();
export const createInjestedDataCommand = new CreateIngestedDataCommand();

// Queries.
export const findInjestedDataQuery = new FindIngestedDataQuery();
export const findZoneQuery = new FindZoneQuery();
export const listDataPointsQuery = new ListDataPointsQuery();

// Providers.
export const geodecoderProvider = new GeodecoderProvider();
export const inpeProvider = new InpeProvider();

// Services.
export const ingestLatestDataService = new IngestLatestDataService(
  inpeProvider,
  geodecoderProvider,
  findInjestedDataQuery,
  findZoneQuery,
  createInjestedDataCommand,
  createDataPoints
);
export const listDataPointsService = new ListDataPointsService(
  listDataPointsQuery
);
