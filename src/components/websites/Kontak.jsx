/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Matel = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const [msg, setMsg] = useState("");
    const [modalActive, setModalActive] = useState(false);

    const saveInbox = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/inboxs", {
                name: name,
                email: email,
                messageContent: messageContent
            });
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                toast.error(`${msg}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    };
    const handleModal = () => {
        // window.location.reload();
        setModalActive(false)
        setName("");
        setEmail("");
        setMessageContent("");
    };

    return (
        <div style={{ background: 'linear-gradient(to bottom, #b4e5f9 2%, #ffffff 65%)', backgroundSize: `cover`, backgroundPosition: `center`, paddingTop: '70px' }}>
            <div className="container mb-6">
                <nav class="breadcrumb mt-5" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="/">Beranda</a></li>
                        <li class="is-active"><a href="#">Kontak</a></li>
                    </ul>
                </nav>
                <h1 className="title is-4 has-text-centered">Hubungi Kami</h1>
                <div className="card has-background-light mx-6">
                    <div className="subtitle has-text-centered pt-3"><strong>Pesan</strong></div>
                    <div className="card-content">
                        <form onSubmit={saveInbox}>
                            <div className="field">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@gmail.com"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Isi Pesan</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={messageContent}
                                        onChange={(e) => setMessageContent(e.target.value)}
                                        placeholder="Isi Pesan ..."
                                        rows="2">
                                    </textarea>
                                </div>
                            </div>
                            <div className="field pt-2">
                                <div className="control">
                                    <button onClick={() => setModalActive(true)} type="submit" className="button is-success">
                                        Kirim
                                    </button>
                                    <ToastContainer limit={1} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {name && email && messageContent && modalActive &&
                    <div className="modal is-active">
                        <div className="modal-background" onClick={handleModal} />
                        <div className="card has-background-white has-text-centered">
                            <div className="card-header-title mx-6 px-6">Pesan Terkirim</div>
                            <p>Terimakasih sudah mengirimkan pesan</p>
                            <div className="mx-4 my-4 pt-3">
                                <button className="button is-primary mx-6" onClick={handleModal}>OK</button>
                            </div>
                        </div>
                    </div>
                }
            </div >
        </div >
    );
};

export default Matel;