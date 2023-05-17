import React from "react";
import risk from "../../assets/images/risk.png";
import consul from "../../assets/images/consul.png";
import secure from "../../assets/images/secure.png";

const Layanan = () => {

    return (

        <div style={{ background: 'linear-gradient(to top, #b4e5f9 5%, #ffffff 80%)', backgroundSize: `cover`, backgroundPosition: `center` }}>
            <div className="container">
                <section id="layanan" className="mx-6 pt-4" style={{paddingBottom: '60px', marginBottom: 'opx'}}>
                    <h1 className="title has-text-centered is-4">Professional Security for Your Fiduciary Assets</h1>
                    <h2 className="subtitle has-text-centered is-6">
                        Kami menyediakan jasa pengamanan aset fidusia yang professional untuk melindungi aset Anda.
                    </h2>

                    <div className="columns is-vcentered">
                        <div className="column is-4">
                            <div className="card has-background-white-ter" style={{ height: '350px' }}>
                                <div className="card-content">
                                    <h3 className="title is-5 has-text-centered">Professional and Secure</h3>
                                    <figure className="image is-128x128 mx-auto">
                                        <img src={secure} alt="" />
                                    </figure>
                                    <p className="has-text-centered">
                                        Kami sudah memiliki sertifikasi dari Otoritas Jasa Keuangan (OJK) dan tenaga kerja kami sudah menjalani pelatihan dan memiliki Sertifikasi Profesi Pembiayaan Indonesia (SPPI).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="column is-4">
                            <div className="card has-background-white-ter" style={{ height: '350px' }}>
                                <div className="card-content">
                                    <h3 className="title is-5 has-text-centered">Risk Management</h3>
                                    <figure className="image is-128x128 mx-auto">
                                        <img src={risk} alt="" />
                                    </figure>
                                    <p className="has-text-centered">
                                        Kami melakukan evaluasi risiko dan mengelola risiko terkait dengan aset fidusia Anda agar terhindar dari ancaman keamanan.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="column is-4">
                            <div className="card has-background-white-ter" style={{ height: '350px' }}>
                                <div className="card-content">
                                    <h3 className="title is-5 has-text-centered">Security Consulting</h3>
                                    <figure className="image is-128x128 mx-auto">
                                        <img src={consul} alt="" />
                                    </figure>
                                    <p className="has-text-centered">
                                        Kami menyediakan layanan konsultasi keamanan untuk membantu Anda memahami kebutuhan keamanan aset fidusia Anda dan mengembangkan strategi keamanan yang tepat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Layanan;