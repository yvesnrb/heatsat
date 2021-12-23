import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { InfoWindow as MapsInfoWindow } from '@react-google-maps/api';
import { animated, useTransition } from 'react-spring';
import { FaSatellite } from 'react-icons/fa';
import { TSatellite } from '@/entities/heat-reading.entity';

export interface IProps {
  position: google.maps.LatLngLiteral;
  satellite: TSatellite;
  timestamp: string;
  show: boolean;
}

export function InfoWindow(props: IProps): JSX.Element {
  const { satellite, timestamp, position, show } = props;

  const transition = useTransition(show, {
    from: {
      opacity: 0,
      y: 10,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: -10,
    },
  });

  const timeFromNow = useMemo(
    () => formatDistanceToNow(new Date(timestamp), { includeSeconds: true }),
    [timestamp]
  );

  return transition(
    (styles, show) =>
      show && (
        <MapsInfoWindow position={position}>
          <animated.div
            style={styles}
            className="bg-foreground text-background px-6 py-3 rounded"
          >
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
          </animated.div>
        </MapsInfoWindow>
      )
  );
}
