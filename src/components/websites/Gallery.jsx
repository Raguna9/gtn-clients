import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Gallery = () => {
    const [gallery, setGallerys] = useState([]);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/gallerys')
            .then(response => setGallerys(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{ background: '#b4e5f9', backgroundSize: `cover`, backgroundPosition: `center` }}>
            <div className="container">
                <section id="gallery" className="mx-6 pt-4 pb-6" style={{marginBottom: '0'}}>
                    {/* <hr /> */}
                    <h1 className="title is-4 has-text-centered">Gallery</h1>
                    <h2 className="subtitle is-6 has-text-centered">
                        Berikut ini adalah beberapa gambar aktivitas dan dokumentasi perjalanan kami.
                    </h2>

                    <div className="columns is-multiline mt-3">
                        {gallery.slice(0, 3).map((gallery, index) => (
                            <div key={index} className="column is-one-third">
                                <div className="card has-background-light pb-1">
                                    <div className="card-image">
                                        <figure className="image">
                                            <img src={gallery.urlImage} alt={gallery.description}
                                                onClick={() => setActiveImage(gallery.urlImage)} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                                        </figure>
                                    </div>
                                    <div className="pl-4 py-4" style={{ height: '80px' }}>
                                        <p className="descGallery">{gallery.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="gallerypages" className="button is-danger is-rounded">Selengkapnya</a>

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
                </section>
            </div>
        </div>
    );
};

export default Gallery;