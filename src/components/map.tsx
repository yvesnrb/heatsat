import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { mapsConfig } from '@/util/config';
import mapStyle from '@/util/map-style.json';
import { FaSpinner } from 'react-icons/fa';
import { useMapStore } from '@/hooks/use-map-store';
import { Marker } from '@/components/marker';

export function Map(): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: 'google-maps',
    googleMapsApiKey: mapsConfig.key,
  });

  const markers = useMapStore((state) => state.markers);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100vw', height: '100vh' }}
      center={{ lat: -3.745, lng: -38.523 }}
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
        <Marker key={m._id.toHexString()} {...m} />
      ))}
    </GoogleMap>
  ) : (
    <div className="flex w-screen h-screen justify-center items-center bg-background fg-foreground">
      <p className="font-bold mr-3">Loading...</p>
      <FaSpinner className="animate-spin" />
    </div>
  );
}
