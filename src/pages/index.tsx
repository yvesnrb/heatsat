import { useEffect } from 'react';
import type { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { ListDataPointsQuery } from '@/queries/list-data-points.query';
import { ListDataPointsService } from '@/services/list-data-points.service';
import { IDataPoint } from '@/entities/data-point.entity';
import { useMapStore } from '@/hooks/use-map-store';

export interface IProps {
  initialDataPoints: IDataPoint[];
}

export default function NextPage(props: IProps): JSX.Element {
  const { initialDataPoints } = props;

  const setMarkers = useMapStore((state) => state.setMarkers);

  useEffect(() => {
    setMarkers(initialDataPoints);
  }, [initialDataPoints, setMarkers]);

  return (
    <div className="font-normal text-lg">
      <Head>
        <title>HEATSAT</title>
        <meta name="description" content="Track wildfires in South America." />
        <meta
          name="og:description"
          content="Track wildfires in South America."
        />
        <meta
          name="og:image"
          content="https://heatsat.vercel.app/og-image.png"
        />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="627" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="mb-3">
        Hello! Welcome to HEATSAT. You are viewing real time satellite data from
        the last 6 hours. More coming soon.
      </p>

      <Link href="/info">
        <a className="border-dotted border-b-2 text-base border-accent-5">
          Click here for more info.
        </a>
      </Link>
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<IProps>
> {
  const listDataPointsQuery = new ListDataPointsQuery();
  const listDataPointsService = new ListDataPointsService(listDataPointsQuery);
  const initialDataPoints = await listDataPointsService.execute({
    timeframe: 6,
  });

  return {
    props: { initialDataPoints },
  };
}
