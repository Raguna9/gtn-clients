/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublicNavbar from "../../components/websites/PublicNavbar";
import PublicFooter from "../../components/websites/PublicFooter";
import './../../components/websites/style.css';

function GalleryPages() {
    const [gallerys, setGallerys] = useState([]);
    const [activeImage, setActiveImage] = useState(null);
    const [shows, setShows] = useState(6);
    const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        getCount();
        axios.get('http://localhost:5000/gallerys')
            .then(response => setGallerys(response.data))
            .catch(error => console.error(error));
    }, []);

    const getCount = async () => {
        const responseGallery = await axios.get("http://localhost:5000/blogs/count");
        setTotalRows(responseGallery.data.count);
    }
    return (
        <React.Fragment>
            <PublicNavbar />
            <div style={{ background: 'linear-gradient(to bottom, #b4e5f9 2%, #ffffff 65%)', backgroundSize: `cover`, backgroundPosition: `center`, paddingTop: '70px' }}>
                <div className="container mb-6">
                    <nav class="breadcrumb mt-5 pb-2" aria-label="breadcrumbs">
                        <ul>
                            <li><a href="/">Beranda</a></li>
                            <li class="is-active"><a href="#">Gallery</a></li>
                        </ul>
                    </nav>
                    <div className="columns is-multiline">
                        {gallerys.slice(0, shows).map(gallery => (
                            <div key={gallery.uuid} className="column is-one-third">
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image">
                                            <img src={gallery.urlImage} alt={gallery.description}
                                                onClick={() => setActiveImage(gallery.urlImage)} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <p className="title is-6 descGallery2" style={{ height: '75px' }}>{gallery.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    {activeImage &&
                        <div className="modal is-active">
                            <div className="modal-background" onClick={() => setActiveImage(null)} />
                            <div className="modal-content">
                                <p className="image">
                                    <img src={activeImage} alt={activeImage} />
                                </p>
                            </div>
                            <button className="modal-close is-large" aria-label="close"
                                onClick={() => setActiveImage(null)} />
                        </div>
                    }
                    {gallerys.length > 0 && shows < totalRows && (
                        <div className='has-text-centered'>
                            <button className="button is-info is-rounded" onClick={() => setShows(shows + 3)}>Lihat lebih banyak</button>
                        </div>
                    )}
                </div>
            </div>
            <PublicFooter />
        </React.Fragment>
    );
}

export default GalleryPages;