import React, { useEffect, useState } from 'react';
import { parse as json2csv } from 'json2csv';
import FileSaver from 'file-saver';
import { useSelector } from 'react-redux';

export default function MapStore(props) {
    const [stores, setStores] = useState([]);
    const storesState = useSelector((state) => state.stores);
    useEffect(() => {
        setStores(storesState);
    }, [storesState])

    const onClick = (event) => {
        if (stores.length > 0) {
            const csv = json2csv(stores);
            var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
            FileSaver.saveAs(blob, "store.csv");
        }
    }
    return (
        <button className="download-csv-button" onClick={onClick} disabled={stores.length <= 0}>Télécharger CSV ({stores.length})</button>
    )
}