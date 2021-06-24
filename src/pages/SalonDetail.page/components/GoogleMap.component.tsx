import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { IMap } from '../../../models';
import mapStyle from '../utils/MapStyle.utils';
import { Button } from '../../../components/formUtils/';

const mapContainerStyle = {
  width: '100vw',
  height: '120vh',
};

const options = {
  disableDefaultUI: true,
  styles: mapStyle,
};

export default function Map(props: IMap): JSX.Element {
  const [marker, setMarker] = React.useState<google.maps.LatLngLiteral>({
    lat: props.lat,
    lng: props.lng,
  });

  function onMapClick(e: google.maps.MapMouseEvent) {
    // sets the marker where the user clicks
    setMarker({
      lat: e.latLng ? e.latLng.lat() : 4.711,
      lng: e.latLng ? e.latLng.lng() : -74.0721,
    });
  }
  function onDragEnd(e: google.maps.MapMouseEvent) {
    // sets the marker where the marker is dropped when dragged
    setMarker({
      lat: e.latLng ? e.latLng.lat() : 4.711,
      lng: e.latLng ? e.latLng.lng() : -74.0721,
    });
  }
  const handleSubmit = () => {
    // on submit it passes the coords and adress to the state via props
    const { lat, lng } = marker;
    const address = props.address;
    props.handleCoordsChange({ lat, lng, address });
  };

  return (
    <div className='map'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={marker}
        options={options}
        onClick={onMapClick}
      >
        <Marker
          position={marker}
          draggable={true}
          onDragEnd={onDragEnd}
          icon={{
            url: '/PinMist.png',
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 25),
          }}
        />
      </GoogleMap>
      <div className='buttonConfirm'>
        <Button
          text='Confirmar ubicación'
          handleSubmit={handleSubmit}
          isValid={true}
        />
      </div>
    </div>
  );
}
