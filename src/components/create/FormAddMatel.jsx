import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormAddMatel = () => {
    const [name, setName] = useState("");
    const [kontrak, setKontrak] = useState("");
    const [nopol, setNopol] = useState("");
    const [nosin, setNosin] = useState("");
    const [noka, setNoka] = useState("");
    const [merkType, setMerkType] = useState("");
    const [finance, setFinance] = useState("");
    const [overdue, setOverdue] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveMatel = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/matels", {
                name: name,
                kontrak: kontrak,
                nopol: nopol,
                nosin: nosin,
                noka: noka,
                merkType: merkType,
                finance: finance,
                overdue: overdue
            });
            navigate("/matels");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                toast.error('Form tidak boleh kosong!!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                });
            }

        }
    };

    return (
        <div>
            <h1 className="title">Aset Fidusia</h1>
            <h2 className="subtitle">Tambah Data Aset Fidusia</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveMatel}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">No. Kontrak</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={kontrak}
                                        onChange={(e) => setKontrak(e.target.value)}
                                        placeholder="No. Kontrak..."
                                    />
                                </div>
                            </div>
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
                                <label className="label">Merk/Type</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={merkType}
                                        onChange={(e) => setMerkType(e.target.value)}
                                        placeholder="MerkType..."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Nomor Polisi</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={nopol}
                                        onChange={(e) => setNopol(e.target.value)}
                                        placeholder="Nopol..."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Nomor Mesin</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={nosin}
                                        onChange={(e) => setNosin(e.target.value)}
                                        placeholder="Nosin..."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Nomor Rangka</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={noka}
                                        onChange={(e) => setNoka(e.target.value)}
                                        placeholder="Noka..."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Finance</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={finance}
                                        onChange={(e) => setFinance(e.target.value)}
                                        placeholder="Finance..."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Overdue</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={overdue}
                                        onChange={(e) => setOverdue(e.target.value)}
                                        placeholder="Overdue..."
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Simpan
                                    </button>
                                    <ToastContainer limit={1} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddMatel;