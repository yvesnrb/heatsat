import { useMemo } from 'react';
import { Data, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import useSWR from 'swr';

import mapStyle from '@/util/map-style.json';
import { mapsConfig } from '@/util/config';
import { FaSpinner } from 'react-icons/fa';
import { useMapStore } from '@/hooks/use-map-store';
import { Marker } from '@/components/marker';
import { IDataPoint } from '@/entities/data-point.entity';
import { Serialized } from '@/util/serialized';
import { fetcher } from '@/util/fetcher';
import { IRegion } from '@/entities/region.entity';
import { useCallback } from 'react';
import { center, polygonToLine } from '@turf/turf';

const initialMapCenter: google.maps.LatLngLiteral = {
  lat: -3.745,
  lng: -38.523,
};

export function Map(): JSX.Element {
  const currentTimeframe = useMapStore((store) => store.currentTimeframe);

  const currentRegion = useMapStore((store) => store.currentRegion);

  const { data: markers } = useSWR<Serialized<IDataPoint>[]>(
    `/api/data-points?timeframe=${currentTimeframe}`,
    fetcher
  );

  const { data: region } = useSWR<Serialized<IRegion>>(
    () => (currentRegion ? `/api/regions/${currentRegion._id}` : false),
    fetcher
  );

  const handleDataLoad = useCallback(
    (data: google.maps.Data) => {
      if (!region) return;
      const geoJsonLine = polygonToLine(region.geojson);
      const geoJsonCenter = center(region.geojson);

      data.addGeoJson(geoJsonLine);
      data.setStyle({
        strokeColor: 'red',
      });
      data.getMap()?.setCenter({
        lat: geoJsonCenter.geometry.coordinates[1],
        lng: geoJsonCenter.geometry.coordinates[0],
      });
      data.getMap()?.setZoom(6);
    },
    [region]
  );

  const { isLoaded } = useJsApiLoader({
    id: 'google-maps',
    googleMapsApiKey: mapsConfig.key,
  });

  const isMarkersLoading = useMemo(() => Boolean(!markers), [markers]);

  const isRegionLoading = useMemo(
    () => Boolean(currentRegion && !region),
    [currentRegion, region]
  );

  return isLoaded && !isMarkersLoading && !isRegionLoading ? (
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
      {markers && markers.map((m) => <Marker key={m._id} {...m} />)}

      {region && <Data onLoad={handleDataLoad} />}
    </GoogleMap>
  ) : (
    <div className="flex w-screen h-screen justify-center items-center bg-background fg-foreground">
      <p className="font-bold mr-3">Loading...</p>

      <FaSpinner className="animate-spin" />
    </div>
  );
}
