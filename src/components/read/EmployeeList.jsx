import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        const response = await axios.get("http://localhost:5000/employees");
        setEmployees(response.data);
    };

    const deleteEmployee = async (employeeId) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/employees/${employeeId}`);
            getEmployees();
        }
    };

    return (
        <div className="container mr-2">
            <h1 className="title">Tenaga Kerja Internal</h1>
            <h2 className="subtitle">Daftar Tenaga Kerja Internal</h2>
            <Link to="/employees/add" className="button is-primary mb-2">
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
                    {employees.map((employee, index) => (
                        <tr key={employee.uuid} style={{ fontSize: '15px' }}>
                            <td>{index + 1}</td>
                            <td style={{ width: "115px" }}>{employee.name}</td>
                            <td style={{ width: "100px" }}>{employee.department}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.email}</td>
                            <td>{employee.sppi}</td>
                            <td>
                                <figure className="image is-3by4">
                                    <img
                                        src={employee.urlImage}
                                        alt={employee.name}
                                        onClick={() => setIsOpen(employee.urlImage)}
                                    />
                                </figure>
                            </td>
                            <td style={{ width: "150px" }}>
                                <Link
                                    to={`/employees/edit/${employee.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteEmployee(employee.uuid)}
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
        </div>
    );
};

export default EmployeeList;