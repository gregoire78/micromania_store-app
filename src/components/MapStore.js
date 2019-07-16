import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, ZoomControl, Tooltip, Polyline, GeoJSON, ScaleControl, MapLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

export default function MapStore(props) {
    const map = useRef(null);
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
        <Map ref={map} center={[46.52863469527167, 2.43896484375]} zoom={6} style={{ width: '100%', height: 'calc(100vh - 50px)', zIndex: "1" }}>
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
                    return L.marker(latlng, {
                        title: "", icon: L.icon({
                            iconUrl: 'https://www.micromania.fr/skin/frontend/enterprise/micromania/images/shop/mapIcon.png',
                            iconSize: [19, 30],
                            iconAnchor: [19 / 2, 30],
                            popupAnchor: [0, -30],
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/images/marker-shadow.png',
                            shadowSize: [30, 30],
                            shadowAnchor: [19 / 2, 30]
                        })
                    });
                }} onEachFeature={(feature, layer) => {
                    //if(map) console.log(map.current.leafletElement.getBounds().contains(layer.getLatLng()))
                    if (feature.properties && feature.properties.description) {
                        layer.bindPopup(feature.properties.description);
                    }
                }} />}
            </MarkerClusterGroup>
        </Map>
    );
}
