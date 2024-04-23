import { TileLayer, MapContainer, Marker } from 'react-leaflet';
import { BookingInfo } from '@type/booking-info';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks/index';
import { bookingActions } from '@store/slices/booking';
import URL_MARKER_DEFAULT from '@assets/pin-default.svg';
import URL_MARKER_ACTIVE from '@assets/pin-active.svg';
import 'leaflet/dist/leaflet.css';

type TMapProps = {
  locations?: BookingInfo[];
  latitude: number;
  longitude: number;
}

function Map({ locations, latitude, longitude }: TMapProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeMarker, setActiveMarker] = useState<string | null>(locations ? locations[0].id : null);

  useEffect(() => {
    if (locations && locations.length > 0) {
      setActiveMarker(locations[0].id);
    }
  }, [locations]);

  const defaultIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [23, 42],
    iconAnchor: [11.5, 42],
  });

  const activeIcon = new Icon({
    iconUrl: URL_MARKER_ACTIVE,
    iconSize: [23, 42],
    iconAnchor: [11.5, 42],
  });

  const handleMarkerClick = (id: string) => {
    setActiveMarker(id);
    dispatch(bookingActions.setSelectedBookingInfo(id));
  };

  return (
    <div className="map">
      <MapContainer center={[latitude, longitude]} zoom={10} className="map__container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations && locations?.length > 0 ? locations?.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.location.coords[0], marker.location.coords[1]]}
            icon={marker.id === activeMarker ? activeIcon : defaultIcon}
            eventHandlers={{ click: () => handleMarkerClick(marker.id) }}
          />
        )) : <Marker position={[latitude, longitude]} icon={defaultIcon} />}
      </MapContainer>
    </div>
  );
}

export default Map;
