import React, { useRef } from 'react';
import L from 'leaflet';
import { Map, TileLayer, GeoJSON, ScaleControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

export default function MapStore(props) {
    const map = useRef(null);
    return (
        <Map ref={map} center={[46.52863469527167, 2.43896484375]} zoom={6} style={{ width: '100%', height: 'calc(100vh - 50px)', zIndex: "1" }}>
            <ScaleControl position="bottomleft" />
            <TileLayer
                minZoom={1}
                maxZoom={20}
                attribution='donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
                url='//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
            />
            <MarkerClusterGroup
            iconCreateFunction={(cluster) => {
                return L.divIcon({
                  html: `<span>${cluster.getChildCount()}</span>`,
                  className: 'marker-cluster-custom',
                  iconSize: L.point(30, 30, true),
                });
              }}
            >
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
