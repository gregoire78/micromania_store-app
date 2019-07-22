import React, { useEffect, useState } from 'react';
import Map from '../components/MapStore';
import ListStores from '../components/ListStores';

export default function Home() {

    const [geoJson, setGeoJson] = useState({
        "type": "FeatureCollection",
        "features": []
    });

    useEffect(() => {
        async function getGeoJson() {
            const response = await fetch(`//${process.env.REACT_APP_API_HOST}/v1/geojson`, {
                method: 'GET'
            });
            const data = await response.json();
            setGeoJson(data)
            return data.data;
        }
        getGeoJson()
    }, [])
    return (
        <main>
            <Map geojson={geoJson} />
            <ListStores />
        </main>
    )
}