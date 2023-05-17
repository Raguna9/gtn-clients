/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { AiTwotoneMail, AiFillPhone, AiFillYoutube, AiFillInstagram, AiFillFacebook } from "react-icons/ai";

const PublicFooter = () => {

    return (
        <div className="container is-fluid px-6 has-background-light pt-4">
            <div className="columns" style={{ marginBottom: '0', paddingBottom: '0' }}>
                <div className="column is-5 is-hidden-mobile">
                    {/* <h3 className="subtitle has-text-white-ter has-text-centered pt-6">Tambahan</h3> */}
                    <div className="columns">
                        <div className="column has-text-info is-6">
                            <iframe title="PT. Global Litigation Nnusantara" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d986.1561819404212!2d116.4503547291501!3d-8.63197757369828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcc4b65892b54bf%3A0x7e960304214f0785!2sGTN%20Pt.Global%20Litigation%20Nusantara!5e0!3m2!1sen!2sid!4v1676834692241!5m2!1sen!2sid" width="450" height="200" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
                <div className="column is-7">
                    <div className="columns is-centered">
                        <div className="column is-9">
                            <p className="">
                                Jalan Raya Sikur - Mataram km. 41, Desa Sikur, Kec. Sikur
                            </p>
                            <p className="">
                                Lombok Timur
                            </p>
                            <p>
                                Nusa Tenggara Barat 83662
                            </p>
                            <br />
                            <p className="pb-2">
                                <AiFillPhone /> (0376)2992597
                            </p>
                            <p className="pb-2">
                                <AiTwotoneMail /> globallitigationnusantara@gmail.com
                            </p>
                            <div className="pt-3" style={{ fontSize: '23px' }}>
                                <p>
                                    <AiFillYoutube /> <AiFillInstagram /> <AiFillFacebook />
                                </p>
                            </div>
                        </div>
                        <div className="column">
                            {/* <p>
                                Jika memiliki pertanyaan silakan menghubungi kami melalui beberapa jalur yang tertera.
                            </p> */}

                            <a href="/faqpages"><p className="pb-2">FAQ</p></a>
                            <a href="/blogpages"><p className=" pb-2">Blog</p></a>
                            <a href="/gallerypages"><p className=" pb-2">Gallery</p></a>
                            <a href="/aboutpages"><p className=" pb-2">Tentang Perusahaan</p></a>
                            <a href="/employeepages"><p className=" pb-2">Tenaga Kerja</p></a>
                            <a href="#"><p className=" pb-2">Mitra Kerja</p></a>
                        </div>
                    </div>
                </div>

            </div>
            <p className="has-text-centered pb-2 is-size-7">
                © 2023 PT. Global Litigation Nusantara
            </p>
        </div>
    );
};

export default PublicFooter;