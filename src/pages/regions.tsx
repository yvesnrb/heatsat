import { useCallback, useState } from 'react';
import Head from 'next/head';
import { FaChevronRight, FaSpinner } from 'react-icons/fa';
import useSWR from 'swr';

import { CountriesListbox } from '@/components/countries-listbox';
import { fetcher } from '@/util/fetcher';
import { Serialized } from '@/util/serialized';
import { IRegion } from '@/entities/region.entity';
import { useMapStore } from '@/hooks/use-map-store';
import { useUIStore } from '@/hooks/use-ui-store';

export default function NextPage(): JSX.Element {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );

  const { data: regions } = useSWR<Serialized<Omit<IRegion, 'geojson'>>[]>(
    () =>
      selectedCountry ? `/api/regions?countryId=${selectedCountry}` : false,
    fetcher
  );

  const setCurrentRegion = useMapStore((store) => store.setCurrentRegion);

  const openRegionNav = useUIStore((store) => store.openRegionNav);

  const setMainWindowAnimation = useUIStore(
    (state) => state.setMainWindowAnimation
  );

  const handleRegionClick = useCallback(
    (region: Serialized<Omit<IRegion, 'geojson'>>) => {
      setMainWindowAnimation('fromTop');
      setCurrentRegion(region);
      openRegionNav();
    },
    [setCurrentRegion, openRegionNav, setMainWindowAnimation]
  );

  return (
    <div className="font-normal text-lg">
      <Head>
        <title>HEATSAT | Regions</title>
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
        Select a region to see its heat activity over time.
      </p>

      <CountriesListbox value={selectedCountry} onChange={setSelectedCountry} />

      <div className="space-y-2">
        {!regions && (
          <div className="flex justify-center items-center bg-foreground fg-background">
            <p className="font-bold mr-3">Loading regions...</p>

            <FaSpinner className="animate-spin" />
          </div>
        )}
        {regions &&
          regions.map((r) => (
            <div
              key={r._id}
              className="flex items-center justify-between px-4 py-3 rounded bg-accent-7 hover:bg-accent-6 transition-all cursor-pointer"
              onClick={() => handleRegionClick(r)}
            >
              <h4>{r.name}</h4>

              <FaChevronRight />
            </div>
          ))}
      </div>
    </div>
  );
}
