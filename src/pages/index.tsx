import Head from 'next/head';
import Link from 'next/link';

import { IDataPoint } from '@/entities/data-point.entity';

export interface IProps {
  initialDataPoints: IDataPoint[];
}

export default function NextPage(): JSX.Element {
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
