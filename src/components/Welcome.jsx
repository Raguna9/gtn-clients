import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Welcome = () => {
    const { user } = useSelector((state) => state.auth);
    const [countInbox, setCountInbox] = useState(0);
    const [countBlog, setCountBlog] = useState(0);
    const [countExternalEmployee, setCountExternalEmployee] = useState(0);
    const [countEmployee, setCountEmployee] = useState(0);
    const [countGallery, setCountGallery] = useState(0);
    const [countFAQ, setCountFAQ] = useState(0);
    const [countUser, setCountUser] = useState(0);
    const [countPartner, setCountPartner] = useState(0);
    const [countMatel, setCountMatel] = useState(0);

    const getCount = async () => {
        try {
            const responseInbox = await axios.get("http://localhost:5000/inboxs/count");
            setCountInbox(responseInbox.data.count);
            const responseBlog = await axios.get("http://localhost:5000/blogs/count");
            setCountBlog(responseBlog.data.count);
            const responseExternalEmployee = await axios.get("http://localhost:5000/externalEmployees/count");
            setCountExternalEmployee(responseExternalEmployee.data.count);
            const responseEmployee = await axios.get("http://localhost:5000/employees/count");
            setCountEmployee(responseEmployee.data.count);
            const responseUser = await axios.get("http://localhost:5000/users/count");
            setCountUser(responseUser.data.count);
            const responseFAQ = await axios.get("http://localhost:5000/faqs/count");
            setCountFAQ(responseFAQ.data.count);
            const responsePartner = await axios.get("http://localhost:5000/partners/count");
            setCountPartner(responsePartner.data.count);
            const responseGallery = await axios.get("http://localhost:5000/gallerys/count");
            setCountGallery(responseGallery.data.count);
            const responseMatel = await axios.get("http://localhost:5000/matels/count");
            setCountMatel(responseMatel.data.count);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCount();
    }, []);


    return (
        <div>
            <h1 className="title">Dashboard</h1>
            <h2 className="subtitle">
                Selamat datang kembali <strong>{user && user.name}</strong>
            </h2>
            <div className="container mr-2">
                <div className="columns is-multiline">
                    <div className="column is-3">
                        <div className="card has-background-danger-dark" style={{ height: '150px' }}>
                            <div className="card-content">
                                <div className="content" style={{ height: "160px" }}>
                                    <div className="has-text-centered">
                                        <h1 className="title has-text-white-ter">{countBlog}</h1>
                                        <h4 className="title has-text-white-ter">Blog</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div className="card has-background-warning-dark" style={{ height: '150px' }}>
                            <div className="card-content">
                                <div className="content" style={{ height: "160px" }}>
                                    <div className="has-text-centered">
                                        <h1 className="title has-text-white-ter">{countMatel}</h1>
                                        <h4 className="title has-text-white-ter">Data Aset Fidusia</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {user && user.role === "admin" && (
                        <>
                            <div className="column is-3">
                                <div className="card has-background-info" style={{ height: '150px' }}>
                                    <div className="card-content">
                                        <div className="content" style={{ height: "160px" }}>
                                            <div className="has-text-centered">
                                                <h1 className="title has-text-white-ter">{countInbox}</h1>
                                                <h4 className="title has-text-white-ter">Pesan</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="card has-background-info-dark" style={{ height: '150px' }}>
                                    <div className="card-content">
                                        <div className="content" style={{ height: "160px" }}>
                                            <div className="has-text-centered">
                                                <h1 className="title has-text-white-ter">{countEmployee}</h1>
                                                <h4 className="title has-text-white-ter">Tenaga Kerja Internal</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="card has-background-danger" style={{ height: '150px' }}>
                                    <div className="card-content">
                                        <div className="content" style={{ height: "160px" }}>
                                            <div className="has-text-centered">
                                                <h1 className="title has-text-white-ter">{countExternalEmployee}</h1>
                                                <h4 className="title has-text-white-ter">Tenaga Kerja Eksternal</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="card has-background-grey" style={{ height: '150px' }}>
                                    <div className="card-content">
                                        <div className="content" style={{ height: "160px" }}>
                                            <div className="has-text-centered">
                                                <h1 className="title has-text-white-ter">{countPartner}</h1>
                                                <h4 className="title has-text-white-ter">Mitra Kerja</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="card has-background-grey-dark" style={{ height: '150px' }}>
                                    <div className="card-content">
                                        <div className="content" style={{ height: "160px" }}>
                                            <div className="has-text-centered">
                                                <h1 className="title has-text-white-ter">{countUser}</h1>
                                                <h4 className="title has-text-white-ter">User</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="card has-background-success-dark" style={{ height: '150px' }}>
                                    <div className="card-content">
                                        <div className="content" style={{ height: "160px" }}>
                                            <div className="has-text-centered">
                                                <h1 className="title has-text-white-ter">{countGallery}</h1>
                                                <h4 className="title has-text-white-ter">Galeri</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-3">
                                <div className="card has-background-success" style={{ height: '150px' }}>
                                    <div className="card-content">
                                        <div className="content" style={{ height: "160px" }}>
                                            <div className="has-text-centered">
                                                <h1 className="title has-text-white-ter">{countFAQ}</h1>
                                                <h4 className="title has-text-white-ter">FAQ</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Welcome;