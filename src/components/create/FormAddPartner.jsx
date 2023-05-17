import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormAddPartner = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    const savePartner = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        try {
            await axios.post("http://localhost:5000/partners", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/partners")
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
    }

    return (
        <div>
            <h1 className="title">Partners</h1>
            <h2 className="subtitle">Tambah Data Partner</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={savePartner}>
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

export default FormAddPartner;