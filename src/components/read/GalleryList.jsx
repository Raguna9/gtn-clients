import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './../websites/style.css';

const GalleryList = () => {
    const [gallerys, setGallerys] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    useEffect(() => {
        getGallerys();
    }, []);

    const getGallerys = async () => {
        const response = await axios.get("http://localhost:5000/gallerys");
        setGallerys(response.data);
    };

    const deleteGallery = async (galleryId) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/gallerys/${galleryId}`);
            getGallerys();
        }
    };

    return (
        <div className="container mr-2">
            <h1 className="title">Galeri</h1>
            <h2 className="subtitle">List Galeri</h2>
            <Link to="/gallerys/add" className="button is-primary mb-2">
                Tambah Data
            </Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Gambar</th>
                        <th>Deskripsi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>                
                <tbody>
                    {gallerys.map((gallery, index) => (
                        <tr key={gallery.uuid}>
                            <td>{index + 1}</td>
                            <td style={{ maxWidth: '250px', objectFit: 'cover' }}>
                                <img src={gallery.urlImage} alt={gallery.uuid} onClick={() => setIsOpen(gallery.urlImage)} />
                            </td>
                            <td>
                                <p className="descGallery3">
                                    {gallery.description}
                                </p>
                            </td>
                            <td style={{ width: "150px" }}>
                                <Link
                                    to={`/gallerys/edit/${gallery.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteGallery(gallery.uuid)}
                                    className="button is-small is-danger ml-1"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isOpen &&
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => setIsOpen(null)} />
                    <div className="modal-content">
                        <p className="image">
                            <img src={isOpen} alt={isOpen} />
                        </p>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                        onClick={() => setIsOpen(null)} />
                </div>
            }
        </div>
    );
};

export default GalleryList;