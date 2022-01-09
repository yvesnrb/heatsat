import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import useSWR from 'swr';

import { mapsConfig } from '@/util/config';
import mapStyle from '@/util/map-style.json';
import { FaSpinner } from 'react-icons/fa';
import { useMapStore } from '@/hooks/use-map-store';
import { Marker } from '@/components/marker';
import { IDataPoint } from '@/entities/data-point.entity';
import { Serialized } from '@/util/serialized';
import { fetcher } from '@/util/fetcher';

const initialMapCenter: google.maps.LatLngLiteral = {
  lat: -3.745,
  lng: -38.523,
};

export function Map(): JSX.Element {
  const currentTimeframe = useMapStore((store) => store.currentTimeframe);

  const { data: markers } = useSWR<Serialized<IDataPoint>[]>(
    `/api/data-points?timeframe=${currentTimeframe}`,
    fetcher
  );

  const { isLoaded } = useJsApiLoader({
    id: 'google-maps',
    googleMapsApiKey: mapsConfig.key,
  });

  return isLoaded && markers ? (
    <GoogleMap
      mapContainerStyle={{ width: '100vw', height: '100vh' }}
      center={initialMapCenter}
      zoom={4}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        styles: mapStyle,
        keyboardShortcuts: false,
      }}
    >
      {markers.map((m) => (
        <Marker key={m._id} {...m} />
      ))}
    </GoogleMap>
  ) : (
    <div className="flex w-screen h-screen justify-center items-center bg-background fg-foreground">
      <p className="font-bold mr-3">Loading...</p>
      <FaSpinner className="animate-spin" />
    </div>
  );
}
