import { CreateDataPoints } from '@/commands/create-data-points.command';
import { CreateIngestedDataCommand } from '@/commands/create-ingested-data.command';
import { GeodecoderProvider } from '@/providers/geodecoder.provider';
import { InpeProvider } from '@/providers/inpe.provider';
import { CountDataPointsQuery } from '@/queries/count-data-points.query';
import { FindIngestedDataQuery } from '@/queries/find-ingested-data.query';
import { FindRegionQuery } from '@/queries/find-region.query';
import { FindZoneQuery } from '@/queries/find-zone.query';
import { ListCountriesQuery } from '@/queries/list-countries.query';
import { ListDataPointsQuery } from '@/queries/list-data-points.query';
import { ListRegionsQuery } from '@/queries/list-regions.query';
import { FindRegionStatsService } from '@/services/find-region-stats.service';
import { FindRegionService } from '@/services/find-region.service';
import { IngestLatestDataService } from '@/services/ingest-latest-data.service';
import { ListCountriesService } from '@/services/list-countries.service';
import { ListDataPointsService } from '@/services/list-data-points.service';
import { ListRegionsService } from '@/services/list-regions.service';

// This dependency handling was supposed to be done with tsyringe.
// Unfortunately, decorator support in SWC is still experimental. This file is
// a hack with a somewhat similar API so that porting in the future is easier
// (if I ever remember).

// Commands.
export const createDataPoints = new CreateDataPoints();
export const createInjestedDataCommand = new CreateIngestedDataCommand();

// Queries.
export const findInjestedDataQuery = new FindIngestedDataQuery();
export const findZoneQuery = new FindZoneQuery();
export const listDataPointsQuery = new ListDataPointsQuery();
export const listCountriesQuery = new ListCountriesQuery();
export const listRegionsQuery = new ListRegionsQuery();
export const findRegionQuery = new FindRegionQuery();
export const countDataPointsQuery = new CountDataPointsQuery();

// Providers.
export const geodecoderProvider = new GeodecoderProvider(
  listCountriesQuery,
  listRegionsQuery
);
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
export const listCountriesService = new ListCountriesService(
  listCountriesQuery
);
export const listRegionsService = new ListRegionsService(listRegionsQuery);
export const findRegionService = new FindRegionService(findRegionQuery);
export const findRegionStatsService = new FindRegionStatsService(
  countDataPointsQuery
);
