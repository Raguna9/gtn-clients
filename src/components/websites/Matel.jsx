/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

const Matel = () => {
    const [modalActive, setModalActive] = useState(false);
    const [matels, setMatels] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getMatels();
    }, [keyword]);

    const getMatels = async () => {
        const response = await axios.get(
            `http://localhost:5000/carimatels?search_query=${keyword}`
        );
        if (response.data.result.length > 0) {
            setMatels(response.data.result);
        } else {
            setMatels([]);
            setMsg("Data yang anda cari tidak ditemukan");
        }
    };

    const searchData = (e) => {
        e.preventDefault();
        setKeyword(query);
    };

    const handleModal = () => {
        setModalActive(false);
    };

    return (
        <div className="container my-6">
            {/* <nav className="breadcrumb mt-5" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/">Beranda</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Matel
                        </a>
                    </li>
                </ul>
            </nav> */}
            <h1 className="title is-4 has-text-centered">
                Cek Data Aset Fidusia
            </h1>
            <div className="columns">
                <div className="column is-6">
                    <form onSubmit={searchData} className="box has-background-light">
                        <h1 className="label is-5 pl-1 pt-1 pb-3">Cari Data</h1>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input
                                    type="text"
                                    className="input"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Find something here..."
                                />
                            </div>
                            <div className="control">
                                <button onClick={() => setModalActive(true)} type="submit" className="button is-info">
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="pl-1" style={{ fontSize: '12px' }}>
                            <strong>Input dapat berupa : </strong>
                            *no. kontrak / *nopol / *nosin / *noka
                        </div>
                    </form>
                </div>
                <div className="column">
                    <div className="box has-background-warning">
                        <span>
                            <strong>Catatan</strong>
                        </span>
                        <div className="">
                            <p className="pt-3" style={{ fontSize: '14px' }}>
                                Jika Anda menemukan Aset Fidusia yang tertera pada sistem kami, segera konfirmasikan kepada kami atau pihak finance yang terkait melalui beberapa jalur yang tersedia diwebsite ini agar tindakan yang tepat dapat diambil.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {modalActive && matels.length > 0 &&
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => handleModal()} />
                    <div className="modal-content">
                        <div className="card">
                            <div className="card-content">
                                <p className="title is-4 has-text-centered">Detail Aset Fidusia</p>
                                {matels.slice(0, 1).map((matel) => (
                                    <div className="columns" key={matel.uuid}>
                                        <div className="column is-4">
                                            <p>Nama Cutomer</p>
                                            <p>No. Kontrak</p>
                                            <p>Nopol</p>
                                            <p>Nosin</p>
                                            <p>Noka</p>
                                            <p>Merk/Type</p>
                                            <p>OD</p>
                                            <p>Finance</p>
                                        </div>
                                        <div className="column">
                                            <p>: <strong>{matel.name}</strong></p>
                                            <p>: <strong>{matel.kontrak}</strong></p>
                                            <p>: <strong>{matel.nopol}</strong></p>
                                            <p>: <strong>{matel.nosin}</strong></p>
                                            <p>: <strong>{matel.noka}</strong></p>
                                            <p>: <strong>{matel.merkType}</strong></p>
                                            <p>: <strong>{matel.overdue}</strong></p>
                                            <p>: <strong>{matel.finance}</strong></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                        onClick={() => handleModal()} />
                </div>
            }

            {modalActive && matels.length === 0 &&
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => handleModal()} />
                    <div className="modal-content">
                        <div className="card">
                            <div className="card-content">
                                <p className="title is-4 has-text-centered">Detail Aset Fidusia</p>
                                <p className="has-text-centered">{msg}</p>
                            </div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                        onClick={() => handleModal()} />
                </div>
            }
        </div >
    );
};

export default Matel;