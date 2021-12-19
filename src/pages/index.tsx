import type { NextPage } from 'next';
import Head from 'next/head';

export default function NextPage(): JSX.Element {
  return (
    <div className="text-foreground bg-background flex justify-center items-center h-screen">
      <Head>
        <title>HeatSat</title>
        <meta name="description" content="Track wildfires in South America." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className="text-3xl font-bold selection:bg-cyan-light">Coming soon.</p>
    </div>
  );
}
