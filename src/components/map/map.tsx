import { TileLayer, MapContainer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type TMapProps = {
  latitude: number;
  longitude: number;
}

function Map({ latitude, longitude }: TMapProps): JSX.Element {
  return (
    <div className="map">
      <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} className="map__container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} />
      </MapContainer>
    </div>
  );
}

export default Map;
