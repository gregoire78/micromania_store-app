import React, { useEffect, useState } from 'react';
import { Icon, LatLngBounds, LatLng, divIcon, Point, marker, popup } from 'leaflet';
import { Map, TileLayer, Marker, Popup, ZoomControl, Tooltip, Polyline, GeoJSON, ScaleControl, MapLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

export default function MapStore(props) {
    const url = "https://wxs.ign.fr/wi5arjlfu40r0fbm6vw8nzny/geoportail/wmts?" +
        "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
        "&STYLE=normal" +
        "&TILEMATRIXSET=PM" +
        "&FORMAT=image/jpeg" +
        "&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGN" +
        "&TILEMATRIX={z}" +
        "&TILEROW={y}" +
        "&TILECOL={x}"
    return (
        <Map center={[46.52863469527167, 2.43896484375]} zoom={6} style={{ width: '100%', height: 'calc(100vh - 50px)', zIndex: "1" }}>
            <ZoomControl position="bottomleft" />
            <ScaleControl position="bottomleft" />
            <TileLayer
                tileSize={256}
                minZoom={0}
                maxZoom={18}
                attribution='IGN-F/Geoportail'
                url={url}
            />
            <MarkerClusterGroup>
                {props.geojson.features.length > 0 && <GeoJSON data={props.geojson} pointToLayer={(geoJsonPoint, latlng) => {
                    console.log(geoJsonPoint)
                    //return popup().setLatLng(latlng).setContent(geoJsonPoint.properties.description)
                    return marker(latlng, {title: geoJsonPoint.properties.description});
                }} />}
            </MarkerClusterGroup>
        </Map>
    );
}
