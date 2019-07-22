import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DownloadCSV from './DownloadCSV';
import Footer from './Footer';
import { deleteStore } from '../redux';

export default function ListStores() {

    const [stores, setStores] = useState([]);
    const storesState = useSelector((state) => state.stores);
    const dispatch = useDispatch();
    const deleteStoreAction = (csv) => {
        dispatch(deleteStore(csv))
    };
    useEffect(() => {
        setStores(storesState);
    }, [storesState])
    return (
        <aside>
            <header>
                <h2>Liste des magasins sélectionnés</h2>
                <DownloadCSV />
            </header>
            <section>
                {stores.map((store) => {
                    return (
                        <div key={store.id} className="store">
                            <p >
                                {store.title}
                            </p>
                            <button onClick={() => deleteStoreAction(store.id)}><span role="img" aria-label="cross">❌</span></button>
                        </div>

                    )
                })}
            </section>
            <Footer />
        </aside>
    )
}