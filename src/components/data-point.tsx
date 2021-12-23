import { useCallback, useState, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { FaSatellite } from 'react-icons/fa';

import { TSatellite } from '@/entities/heat-reading.entity';

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

  const timeFromNow = useMemo(
    () => formatDistanceToNow(new Date(timestamp), { includeSeconds: true }),
    [timestamp]
  );

  return (
    <>
      {showInfo && (
        <InfoWindow position={position}>
          <div className="bg-foreground text-background px-6 py-3 rounded">
            <div className="flex items-center justify-center">
              <FaSatellite size={25} className="mr-4 text-accent-3" />
              <div>
                <p className="text-xl font-medium mb-1">
                  {position.lat}, {position.lng}
                </p>
                <p className="font-normal text-accent-3">
                  Pinged by {satellite} {timeFromNow} ago.
                </p>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}

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
