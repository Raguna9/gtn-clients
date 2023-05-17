import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditMatel = () => {
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
    const { id } = useParams();

    useEffect(() => {
        const getMatelById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/matels/${id}`
                );
                setName(response.data.name);
                setKontrak(response.data.kontrak);
                setNopol(response.data.nopol);
                setNosin(response.data.nosin);
                setNoka(response.data.noka);
                setMerkType(response.data.merkType);
                setOverdue(response.data.overdue);
                setFinance(response.data.finance);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getMatelById();
    }, [id]);

    const updateMatel = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("kontrak", kontrak);
        formData.append("nopol", nopol);
        formData.append("nosin", nosin);
        formData.append("noka", noka);
        formData.append("merkType", merkType);
        formData.append("finance", finance);
        formData.append("overdue", overdue);
        try {
            await axios.patch(`http://localhost:5000/matels/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/matels");
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancle = async (e) => {
        navigate("/matels");
    };

    return (
        <div>
            <h1 className="title">Aset Fidusia</h1>
            <h2 className="subtitle">Edit Aset Fidusia</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateMatel}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">No. Kontrak</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={kontrak}
                                        onChange={(e) => setKontrak(e.target.value)}
                                        placeholder="No. Kontrak"
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
                                        placeholder="MerkType"
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
                                        placeholder="Nopol"
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
                                        placeholder="Nosin"
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
                                        placeholder="Noka"
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
                                        placeholder="Finance"
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
                                        placeholder="Overdue"
                                    />
                                </div>
                            </div>

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

export default FormEditMatel;