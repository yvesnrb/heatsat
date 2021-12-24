import Head from 'next/head';

export default function NextPage(): JSX.Element {
  return (
    <div className="font-normal text-lg">
      <Head>
        <title>HEATSAT | Info</title>
        <meta name="description" content="HEATSAT information." />
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
        This is the info page. There isn&apos;t much here yet.
      </p>

      <a
        href="https://github.com/yvesnrb/heatsat"
        className="border-dotted border-b-2 text-base border-accent-5"
        target="_blank"
        rel="noreferrer"
      >
        Check out this application on GitHub.
      </a>
    </div>
  );
}
