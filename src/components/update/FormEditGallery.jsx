/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditGallery = () => {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getGalleryById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/gallerys/${id}`
                );
                setDescription(response.data.description);
                setFile(response.data.image);
                setPreview(response.data.urlImage)
            } catch (error) {
                console.log(error);
            }
        };
        getGalleryById();
    }, [id]);

    const updateGallery = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description);
        try {
            await axios.patch(`http://localhost:5000/gallerys/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/gallerys");
        } catch (error) {
            console.log(error);
        }
    };

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };
    const handleCancle = async (e) => {
        navigate("/gallerys");
    };

    return (
        <div>
            <h1 className="title">Gallerys</h1>
            <h2 className="subtitle">Edit Gallery</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateGallery}>
                            {/* <p className="has-text-centered">{msg}</p> */}
                            <div className="field">
                                <label className="label">Deskripsi</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Description"
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
                                        Perbarui
                                    </button>
                                    <button type="submit" className="button is-danger ml-2" onClick={handleCancle}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEditGallery;