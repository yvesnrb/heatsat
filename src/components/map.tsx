import { ReactNode } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { mapsConfig } from '@/util/config';
import mapStyle from '@/util/map-style.json';
import { FaSpinner } from 'react-icons/fa';

export interface IProps {
  children?: ReactNode;
}

export function Map(props: IProps): JSX.Element {
  const { children } = props;

  const { isLoaded } = useJsApiLoader({
    id: 'google-maps',
    googleMapsApiKey: mapsConfig.key,
  });

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
      {children}
    </GoogleMap>
  ) : (
    <div className="flex w-screen h-screen justify-center items-center bg-background fg-foreground">
      <p className="font-bold mr-3">Loading...</p>
      <FaSpinner className="animate-spin" />
    </div>
  );
}
