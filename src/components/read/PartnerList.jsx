import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const PartnerList = () => {
    const [partners, setPartners] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isOpen, setIsOpen] = useState(null);
    const [totalRows, setTotalRows] = useState(0);
    const limit = 10;
    const offset = page * limit;

    useEffect(() => {
        getPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const getPartners = async () => {
        const response = await axios.get(
            `http://localhost:5000/partners?page=${page}&limit=${limit}`
        );
        setPartners(response.data.result);
        setPage(response.data.page);
        setTotalPages(response.data.totalPage);
        setTotalRows(response.data.totalRows);
    };

    const deletePartner = async (partnerId) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/partners/${partnerId}`);
            getPartners();
        }
    };

    const changePage = ({ selected }) => {
        setPage(selected);
    };

    return (
        <div className="container mr-2">
            <h1 className="title">Mitra Kerja</h1>
            <h2 className="subtitle">Daftar Mitra Kerja</h2>
            <Link to="/partners/add" className="button is-primary mb-2">
                Tambah Data
            </Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Gambar</th>
                        <th>Nama</th>
                        <th>Aksi</th>
                    </tr>
                </thead>                
                <tbody>
                    {partners.map((partner, index) => (
                        <tr key={partner.uuid}>
                            <td>{index + 1 + offset}</td>
                            <td style={{ maxWidth: '80px', objectFit: 'cover' }}>
                                <img src={partner.urlImage} alt={partner.name} onClick={() => setIsOpen(partner.urlImage)} />
                            </td>
                            <td>{partner.name}</td>
                            <td>
                                <Link
                                    to={`/partners/edit/${partner.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deletePartner(partner.uuid)}
                                    className="button is-small is-danger ml-1"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isOpen &&
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => setIsOpen(null)} />
                    <div className="modal-content">
                        <p className="image">
                            <img src={isOpen} alt={isOpen} />
                        </p>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                        onClick={() => setIsOpen(null)} />
                </div>
            }

            {partners.length > 0 && limit < totalRows && (
                <div>

                    <p>
                        Total Rows: {totalRows} Page: {totalRows ? page + 1 : 0} of {totalPages}
                    </p>
                    <nav
                        className="pagination is-centered"
                        key={totalRows}
                        role="navigation"
                        aria-label="pagination"
                    >
                        <ReactPaginate
                            previousLabel={"< Prev"}
                            nextLabel={"Next >"}
                            pageCount={totalPages}
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
            )}
        </div>
    );
};

export default PartnerList;