import { useCallback, useState } from 'react';
import { Marker } from '@react-google-maps/api';

import { TSatellite } from '@/entities/heat-reading.entity';
import { InfoWindow } from '@/components/info-window';

export interface IProps {
  position: google.maps.LatLngLiteral;
  satellite: TSatellite;
  timestamp: string;
}

export function DataPoint(props: IProps): JSX.Element {
  const { position, satellite, timestamp } = props;

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
        position={position}
        satellite={satellite}
        timestamp={timestamp}
      />

      <Marker
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        position={position}
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
