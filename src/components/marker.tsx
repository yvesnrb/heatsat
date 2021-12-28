import { useCallback, useState } from 'react';
import { Marker as GoogleMarker } from '@react-google-maps/api';

import { InfoWindow } from '@/components/info-window';
import { IDataPoint } from '@/entities/data-point.entity';
import { Serialized } from '@/util/serialized';

export function Marker(dataPoint: Serialized<IDataPoint>): JSX.Element {
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseOver = useCallback((_e: google.maps.MapMouseEvent) => {
    setShowInfo(true);
  }, []);

  const handleMouseOut = useCallback((_e: google.maps.MapMouseEvent) => {
    setShowInfo(false);
  }, []);

  return (
    <>
      <InfoWindow
        show={showInfo}
        position={{
          lat: dataPoint.lat,
          lng: dataPoint.lon,
        }}
        satellite={dataPoint.satellite}
        timestamp={dataPoint.timestamp}
      />

      <GoogleMarker
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        position={{
          lat: dataPoint.lat,
          lng: dataPoint.lon,
        }}
        icon={{
          path: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0',
          fillColor: '#C50000',
          strokeColor: '#C50000',
          fillOpacity: 1,
          scale: 0.05,
        }}
      />
    </>
  );
}
