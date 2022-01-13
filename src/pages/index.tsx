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
        Hello! Welcome to HEATSAT. You are viewing real time satellite data
        from&nbsp;
        <Link href="/data">
          <a className="border-dotted border-b-2 text-base border-accent-5">
            INPE
          </a>
        </Link>
        . Each reading is a heat source detected by an infrared satellite, and
        may indicate a forest fire.
      </p>

      <p className="mb-3">
        This project was built over the course of 3 weeks by&nbsp;
        <a
          href="https://github.com/yvesnrb"
          className="border-dotted border-b-2 text-base border-accent-5"
          target="_blank"
          rel="noreferrer"
        >
          me
        </a>
        , for the &nbsp;
        <a
          href="https://dev.to/devteam/announcing-the-mongodb-atlas-hackathon-on-dev-4b6m"
          className="border-dotted border-b-2 text-base border-accent-5"
          target="_blank"
          rel="noreferrer"
        >
          MongoDB Atlas Dev Hackaton
        </a>
        . It makes extensive use of the time series database feature. The source
        code is free, under the Apache 2.0 license. You can view the
        source&nbsp;
        <a
          href="https://github.com/yvesnrb/heatsat"
          className="border-dotted border-b-2 text-base border-accent-5"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>

      <p>
        Click the &apos;regions&apos; button above to check how much heat data
        has been collected on a region over time.
      </p>
    </div>
  );
}
