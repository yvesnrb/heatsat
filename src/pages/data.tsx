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

      <p className="mb-5">
        The main source of data for this project is INPE - the brazilian
        national institute for space research.&nbsp;
        <a
          href="https://queimadas.dgi.inpe.br/queimadas/dados-abertos/#"
          className="border-dotted border-b-2 text-base border-accent-5"
          target="_blank"
          rel="noreferrer"
        >
          Learn more
        </a>
        .
      </p>

      <div className="bg-background p-3 rounded">
        <img src="/inpe-logo.png" alt="Site Logo" className="mx-auto" />
      </div>
    </div>
  );
}
