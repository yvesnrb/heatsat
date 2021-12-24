import type { GetServerSidePropsResult } from 'next';
import Head from 'next/head';

import { Map } from '@/components/map';
import { DataPoint } from '@/components/data-point';
import { ListDataPointsQuery } from '@/queries/list-data-points.query';
import { ListDataPointsService } from '@/services/list-data-points.service';
import { TSatellite } from '@/entities/heat-reading.entity';

export interface IProps {
  dataPoints: Array<{
    _id: string;
    zoneID: string;
    lat: number;
    lon: number;
    timestamp: string;
    satellite: TSatellite;
  }>;
}

export default function NextPage(props: IProps): JSX.Element {
  const { dataPoints } = props;

  return (
    <div className="text-foreground bg-background flex justify-center items-center h-screen">
      <Head>
        <title>HeatSat</title>
        <meta name="description" content="Track wildfires in South America." />
        <meta name="og:description" content="Track wildfires in South America." />
        <meta name="og:image" content="https://heatsat.vercel.app/og-image.png" />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="627" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Map>
        {dataPoints.map((d) => (
          <DataPoint
            key={d._id}
            position={{ lat: d.lat, lng: d.lon }}
            satellite={d.satellite}
            timestamp={d.timestamp}
          />
        ))}
      </Map>
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<IProps>
> {
  const listDataPointsQuery = new ListDataPointsQuery();
  const listDataPointsService = new ListDataPointsService(listDataPointsQuery);
  const dataPoints = await listDataPointsService.execute({
    timeframe: 1,
  });

  const serializedDataPoints = dataPoints.map((d) => ({
    ...d,
    _id: d._id.toHexString(),
    zoneID: d.zoneID.toHexString(),
    timestamp: d.timestamp.toString(),
  }));

  return {
    props: { dataPoints: serializedDataPoints },
  };
}
