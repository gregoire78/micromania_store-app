import React from 'react';
import { Icon, LatLngBounds, LatLng, divIcon, Point } from 'leaflet';
import { Map, TileLayer, Marker, Popup, ZoomControl, Tooltip, Polyline, GeoJSON, ScaleControl, MapLayer } from 'react-leaflet';

export default function MapStore(props) {
    return (
        <Map center={[51.505, -0.09]} zoom={13} style={{ width: '100%', height: '100%', zIndex: "1" }}>
            <ZoomControl position="bottomleft" />
            <ScaleControl position="bottomleft" />
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <GeoJSON data={props.geojson} />
        </Map>
    );
}