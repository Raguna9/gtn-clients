import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ExternalEmployeeList = () => {
    const [externalEmployees, setExternalEmployees] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const limit = 10;
    const offset = page * limit;

    useEffect(() => {
        getExternalEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const getExternalEmployees = async () => {
        const response = await axios.get(
            `http://localhost:5000/externalEmployeeDetails?page=${page}&limit=${limit}`
        );
        setExternalEmployees(response.data.result);
        setPage(response.data.page);
        setTotalPages(response.data.totalPage);
        setTotalRows(response.data.totalRows);
    };

    const deleteExternalEmployee = async (externalEmployeeId) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/externalEmployees/${externalEmployeeId}`);
            getExternalEmployees();
        }
    };

    const changePage = ({ selected }) => {
        setPage(selected);
    };

    return (
        <div className="container mr-2">
            <h1 className="title">Tenaga Kerja Eksternal</h1>
            <h2 className="subtitle">Daftar Tenaga Kerja Eksternal</h2>
            <Link to="/externalEmployees/add" className="button is-primary mb-2">
                Tambah Data
            </Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr style={{ fontSize: '15px' }}>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Jabatan</th>
                        <th>Jenis Kelamin</th>
                        <th>Email</th>
                        <th>No SPPI</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>                
                <tbody>
                    {externalEmployees.map((externalEmployee, index) => (
                        <tr key={externalEmployee.uuid} style={{ fontSize: '15px' }}>
                            <td>{index + 1 + offset}</td>
                            <td style={{ width: "120px" }}>{externalEmployee.name}</td>
                            <td style={{ width: "100px" }}>{externalEmployee.department}</td>
                            <td>{externalEmployee.gender}</td>
                            <td>{externalEmployee.email}</td>
                            <td>{externalEmployee.sppi}</td>
                            <td>
                                <figure className="image is-3by4">
                                    <img
                                        src={externalEmployee.urlImage}
                                        alt={externalEmployee.name}
                                        onClick={() => setIsOpen(externalEmployee.urlImage)}
                                    />
                                </figure>
                            </td>
                            <td style={{ width: "150px" }}>
                                <Link
                                    to={`/externalEmployees/edit/${externalEmployee.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteExternalEmployee(externalEmployee.uuid)}
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
            {externalEmployees.length > 0 && limit < totalRows && (
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

export default ExternalEmployeeList;