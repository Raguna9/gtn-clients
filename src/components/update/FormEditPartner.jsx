import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const FormEditPartner = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const getPartnerById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/partners/${id}`
                );
                setName(response.data.name);
                setFile(response.data.image);
                setPreview(response.data.urlImage)
            } catch (error) {
                console.log(error);
            }
        };
        getPartnerById();
    }, [id]);

    const updatePartner = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        try {
            await axios.patch(`http://localhost:5000/partners/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/partners");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                toast.error(`${msg}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                });
            }
        }
    };

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };
    const handleCancle = async (e) => {
        navigate("/partners");
    };

    return (
        <div>
            <h1 className="title">Partners</h1>
            <h2 className="subtitle">Edit Partner</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updatePartner}>
                            {/* <p className="has-text-centered">{msg}</p> */}
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Nama..."
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

export default FormEditPartner;