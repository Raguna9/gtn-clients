import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormAddGallery = () => {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const saveGallery = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description);
        try {
            await axios.post("http://localhost:5000/gallerys", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            toast.success('Form berhasil dikirim!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                onClose: () => navigate("/gallerys"),
            });
            
        } catch (error) {
            console.log(error);
            toast.error('Form tidak boleh kosong!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            });
        }      
    };

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    return (
        <div>
            <h1 className="title">Gallerys</h1>
            <h2 className="subtitle">Tambah Data Gallery</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveGallery}>
                            {/* <p className="has-text-centered">{msg}</p> */}
                            <div className="field">
                                <label className="label">Deskripsi</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Deskripsi..."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Gambar</label>
                                <div className="control">
                                    <div className="file">
                                        <label className="file-label">
                                            <input
                                                type="file"
                                                className="file-input"
                                                onChange={loadImage}
                                            />
                                            <span className="file-cta">
                                                <span className="file-label">Pilih gambar...</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {preview ? (
                                <figure className="image is-128x128">
                                    <img src={preview} alt="Preview Gambar" />
                                </figure>
                            ) : (
                                ""
                            )}

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Simpan
                                    </button>
                                    <ToastContainer limit={1}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddGallery;