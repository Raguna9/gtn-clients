/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormEditBlog = () => {
    const [tittle, setTittle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    // console.log(value);

    useEffect(() => {
        const getBlogById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/blogs/${id}`
                );
                setTittle(response.data.tittle);
                setContent(response.data.content);
                setFile(response.data.image);
                setPreview(response.data.urlImage)
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBlogById();
    }, [id]);

    const updateBlog = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tittle", tittle);
        formData.append("content", content);
        try {
            await axios.patch(`http://localhost:5000/blogs/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/blogs");
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
        navigate("/blogs");
    };

    return (
        <div>
            <h1 className="title">Blogs</h1>
            <h2 className="subtitle">Edit Blog</h2>


            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateBlog}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Judul</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={tittle}
                                        onChange={(e) => setTittle(e.target.value)}
                                        placeholder="Judul..."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Konten</label>
                                <div className="control">
                                    <div className="editorContainer">
                                        <ReactQuill theme="snow" value={content} onChange={setContent} />
                                    </div>
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

export default FormEditBlog;