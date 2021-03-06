import React, { useRef } from 'react';
import L from 'leaflet';
import { Map, TileLayer, GeoJSON, ScaleControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
/*import { parse as json2csv } from 'json2csv';
import FileSaver from 'file-saver';*/
import { addStore } from '../redux';
import { useDispatch } from 'react-redux';

export default function MapStore(props) {
    const map = useRef(null);
    const dispatch = useDispatch();
    const addStoreAction = (csv) => {
        dispatch(addStore(csv))
    };

    const csvFormatter = (feature, data) => {
        const featureData = {
            id: feature.properties.id,
            lat: feature.properties.lat,
            lon: feature.properties.lon,
            link: feature.properties.link,
            monday: data.hours.length > 0 ? data.hours[0][1] : "",
            tuesday: data.hours.length > 0 ? data.hours[1][1] : "",
            wednesday: data.hours.length > 0 ? data.hours[2][1] : "",
            thursday: data.hours.length > 0 ? data.hours[3][1] : "",
            friday: data.hours.length > 0 ? data.hours[4][1] : "",
            saturday: data.hours.length > 0 ? data.hours[5][1] : "",
            sunday: data.hours.length > 0 ? data.hours[6][1] : "",
        }
        const csvObj = Object.assign(featureData, data);
        delete csvObj.hours;
        delete csvObj.status;
        return csvObj;
    }

    return (
        <Map
            ref={map}
            center={[46.52863469527167, 2.43896484375]}
            zoom={6}
            style={{ width: '100%', height: 'calc(100vh - 50px)', zIndex: "1" }}
        >
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
                        layer.bindPopup(feature.properties.description + "<br/>chargement...", {
                            'minWidth': '300'
                        }).on('popupopen', async (popup) => {
                            const url = popup.target.feature.properties.link;
                            const response = await fetch(`//${process.env.REACT_APP_API_HOST}/v1/store`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ url })
                            });
                            const data = await response.json();
                            const objImg = new Image();
                            objImg.src = data.img;
                            objImg.onload = function () {
                                popup.target.getPopup().update()
                            }
                            popup.target.getPopup().setContent(`
                            <div>
                                ${feature.properties.description}
                                <br/><b>Adresse</b>
                                <br/>${data.address}
                                <br/><b>Téléphone</b>
                                <br/>${data.phone}
                                <br/><b>Status</b>
                                <br/>${data.status}
                                <br/><b>Horaires</b>
                                <br/>${data.hours.map((d) => { return d.join(' : ') }).join('<br/>')}
                            </div>
                            <img width="100%" src="${objImg.src}"/>
                            `);
                            addStoreAction(csvFormatter(feature, data));
                        });
                    }
                }} />}
            </MarkerClusterGroup>
        </Map>
    );
}
