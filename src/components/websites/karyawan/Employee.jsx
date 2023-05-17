/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiLinkExternal } from "react-icons/bi";

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [show, setShow] = useState(8);
    const [rows, setTotalRows] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => console.error(error));

        getCount();
    }, []);

    const getCount = async () => {
        const responseEmployee = await axios.get("http://localhost:5000/employees/count");
        setTotalRows(responseEmployee.data.count);
    }

    return (

        <div className='has-has-background-grey-light'>
            <div className="columns is-multiline">
                {employees.slice(0, show).map(employee => (
                    <div key={employee.uuid} className="column is-3">
                        <div className="card">
                            <figure className="image" style={{ position: "relative", backgroundColor: "#E80510" }}>
                                <img src={employee.urlImage} alt={employee.description} />
                            </figure>
                            <div className="card-content">
                                <p style={{ fontSize: "14px", fontWeight: "bold" }}>{employee.name}</p>
                                <p style={{ fontSize: "10px" }}>{employee.email}</p>
                                <p className='pt-2' style={{ fontSize: "12px" }}>{employee.department}</p>
                                <span style={{ fontSize: "10px" }}>
                                    <p><strong>No. SPPI </strong>
                                        <span className='pl-1'>{employee.sppi}</span>
                                        <a>
                                            <BiLinkExternal className='ml-1' onClick={() => setIsOpen(employee.sppi)} />
                                        </a>
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {isOpen &&
                    <div className="modal is-active">
                        <div className="modal-background" onClick={() => setIsOpen(null)} />
                        <div className="modal-content">
                            <p className="image">
                                <img src={`http://localhost:5000/images/sppi/${isOpen}.jpg`} alt={isOpen} />
                            </p>
                        </div>
                        <button className="modal-close is-large" aria-label="close"
                            onClick={() => setIsOpen(null)} />
                    </div>
                }
            </div>

            {employees.length > 0 && show < rows && (
                <div className='has-text-centered'>
                    <button className="button is-info is-rounded" onClick={() => setShow(show + 3)}>Lihat lebih banyak</button>
                </div>
            )}
        </div>
    );
};

export default Employee;
