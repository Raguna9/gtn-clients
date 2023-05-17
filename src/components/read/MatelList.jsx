import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import Matel from "../websites/Matel";

const MatelList = () => {
    const [matels, setMatels] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
    const limit = 15;
    const offset = page * limit;
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        getMatels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, keyword]);

    const getMatels = async () => {
        const response = await axios.get(
            `http://localhost:5000/matelss?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setMatels(response.data.result);
        setPage(response.data.page);
        setTotalPages(response.data.totalPage);
        setTotalRows(response.data.totalRows);
    };

    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
            setMsg(
                "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
            );
        } else {
            setMsg("");
        }
    };

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setMsg("");
        setKeyword(query);
    };

    const deleteMatel = async (matelId) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/matels/${matelId}`);
            getMatels();
        }
    };

    return (
        <div className="container mr-2">
            {user && user.role === "admin" && (
                <>
                    <h1 className="title">Aset Fidusia</h1>
                    <h2 className="subtitle">List data Aset Fidusia</h2>
                    <div className="columns">
                        <div className="column is-6">
                            <Link to="/matels/add" className="button is-primary mb-2">
                                Tambah Data
                            </Link>
                        </div>
                        <div className="column">
                            <form onSubmit={searchData}>
                                <div className="field has-addons">
                                    <div className="control is-expanded">
                                        <input
                                            type="text"
                                            className="input"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Cari data..." />
                                    </div>
                                    <div className="control">
                                        <button type="submit" className="button is-info">
                                            Cari
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <table className="table is-striped is-fullwidth has-shadow" style={{ tableLayout: "auto" }}>
                        <thead>
                            <tr style={{ fontSize: '14px' }}>
                                <th>No</th>
                                <th>Kontrak</th>
                                <th>Nama</th>
                                <th>Merk/Type</th>
                                <th>Nopol</th>
                                <th>Nosin</th>
                                <th>Noka</th>
                                <th>Finance</th>
                                <th>OD</th>
                                {user && user.role === "admin" && (
                                    <th>Aksi</th>
                                )}
                            </tr>
                        </thead>
                        {matels.map((matel, index) => (
                            <tbody key={matel.uuid}>
                                <tr style={{ fontSize: '12px' }}>
                                    <td style={{ width: '10px' }}>{index + 1 + offset}</td>
                                    <td>{matel.kontrak}</td>
                                    <td>{matel.name}</td>
                                    <td>{matel.merkType}</td>
                                    <td>{matel.nopol}</td>
                                    <td>{matel.nosin}</td>
                                    <td>{matel.noka}</td>
                                    <td>{matel.finance}</td>
                                    <td>{matel.overdue}</td>

                                    <td style={{ width: "150px" }}>
                                        <Link
                                            to={`/matels/edit/${matel.uuid}`}
                                            className="button is-small is-info"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteMatel(matel.uuid)}
                                            className="button is-small is-danger ml-1"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>

                    <div>

                        <p>
                            Total Data: {totalRows} Page: {totalRows ? page + 1 : 0} of {totalPages}
                        </p>
                        <p className="has-text-centered has-text-danger py-2">{msg}</p>
                        <nav
                            className="pagination is-centered"
                            key={totalRows}
                            role="navigation"
                            aria-label="pagination"
                        >
                            <ReactPaginate
                                previousLabel={"< Prev"}
                                nextLabel={"Next >"}
                                pageCount={Math.min(10, totalPages)}
                                onPageChange={changePage}
                                containerClassName={"pagination-list"}
                                pageLinkClassName={"pagination-link"}
                                previousLinkClassName={"pagination-previous"}
                                nextLinkClassName={"pagination-next"}
                                activeLinkClassName={"pagination-link is-current"}
                                disabledLinkClassName={"pagination-link is-disabled"}
                            />
                        </nav>
                    </div>
                </>
            )}
            {user && user.role === "user" && (
                <Matel/>
            )}

        </div>
    );
};

export default MatelList;