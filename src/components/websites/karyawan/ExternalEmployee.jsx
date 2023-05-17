/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiLinkExternal } from "react-icons/bi";

const ExternalEmployee = () => {
    const [externalEmployees, setExternalEmployees] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [shows, setShows] = useState(8);
    const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        getCount();
        axios.get('http://localhost:5000/externalEmployees')
            .then(response => setExternalEmployees(response.data))
            .catch(error => console.error(error));
    }, []);

    const getCount = async () => {
        const responseEmployee = await axios.get("http://localhost:5000/externalEmployees/count");
        setTotalRows(responseEmployee.data.count);
    }
    return (
        <div>
        <div className="columns is-multiline">
            {externalEmployees.slice(0, shows).map(externalEmployee => (
                <div key={externalEmployee.uuid} className="column is-3">
                    <div className="card">
                        <figure className="image" style={{ position: "relative", backgroundColor: "#E80510" }}>
                            <img src={externalEmployee.urlImage} alt={externalEmployee.description} />
                        </figure>
                        <div className="card-content">
                            <p style={{ fontSize: "14px", fontWeight: "bold" }}>{externalEmployee.name}</p>
                            <p style={{ fontSize: "10px" }}>{externalEmployee.email}</p>
                            <p className='pt-2' style={{ fontSize: "12px" }}>{externalEmployee.department}</p>
                            <span style={{ fontSize: "10px" }}>
                                <p><strong>No. SPPI</strong>
                                    <span className='pl-1' href="#">{externalEmployee.sppi}</span>
                                    <a>
                                        <BiLinkExternal className='ml-1' onClick={() => setIsOpen(externalEmployee.sppi)} />
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
        {externalEmployees.length > 0 && shows < totalRows && (
                <div className='has-text-centered'>
                    <button className="button is-info is-rounded" onClick={() => setShows(shows + 3)}>Lihat lebih banyak</button>
                </div>
            )}
        </div>
    );
};

export default ExternalEmployee;
