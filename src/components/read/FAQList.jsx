import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './../websites/style.css';

const FAQList = () => {
    const [faqs, setFAQs] = useState([]);

    useEffect(() => {
        getFAQs();
    }, []);

    const getFAQs = async () => {
        const response = await axios.get("http://localhost:5000/faqs");
        setFAQs(response.data);
    };

    const deleteFAQ = async (faqId) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/faqs/${faqId}`);
            getFAQs();
        }
    };

    return (
        <div className="container mr-2">
            <h1 className="title">FAQ</h1>
            <h2 className="subtitle">Daftar FAQ</h2>
            <Link to="/faqs/add" className="button is-primary mb-2">
                Tambah Data
            </Link>
            <table className="table is-striped is-fullwidth has-shadow" style={{ tableLayout: "auto" }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Pertanyaan</th>
                        <th>Jawaban</th>
                        <th>Aksi</th>
                    </tr>
                </thead>                {faqs.map((faq, index) => (
                    <tbody key={faq.uuid}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{faq.question}</td>
                            <td>
                                <p className="faq">
                                {faq.answer}
                                </p>
                                </td>
                            <td style={{ width: "150px" }}>
                                <Link
                                    to={`/faqs/edit/${faq.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteFAQ(faq.uuid)}
                                    className="button is-small is-danger ml-1"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    );
};

export default FAQList;