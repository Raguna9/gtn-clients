/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import logo from "./../../assets/logo/logogtn.png";

const PublicNavbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [navShadow, setNavShadow] = useState(false);

    const handleNavShadow = () => {
        if (window.scrollY >= 10) {
            setNavShadow(true);
        } else {
            setNavShadow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleNavShadow);
        return () => {
            window.removeEventListener("scroll", handleNavShadow);
        };
    }, []);
    return (
        <div className="container">
            <nav className={`navbar is-fixed-top ${navShadow ? "has-background-light" : ""}`} style={navShadow ? { boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' } : { backgroundColor: 'transparent' }} role="navigation" aria-label="main navigation">
                <div className="navbar-brand ml-2">
                    {window.location.pathname === '/' ? (
                        <Link to="home" spy={true} smooth={true} offset={-90} duration={500}>
                            <figure className="pl-3 pt-2">
                                <img src={logo} width="100" height="28" alt="PT. GTN" />
                            </figure>
                        </Link>
                    ) : (
                        <figure className="pl-3 pt-2">
                            <a onClick={() => window.location.assign('/')}>
                                <img src={logo} width="100" height="28" alt="PT. GTN" />
                            </a>
                        </figure>
                    )}
                    <a
                        role="button"
                        className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        onClick={() => setIsActive(!isActive)}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                    <div className="navbar-end mr-2">
                        {window.location.pathname === '/' ? (
                            <Link className="navbar-item" to="home" spy={true} smooth={true} offset={-90} duration={500}>
                                Beranda
                            </Link>
                        ) : (
                            <a className="navbar-item" href="/">
                                Beranda
                            </a>
                        )}

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">Informasi</a>
                            <div className="navbar-dropdown has-background-info-light">
                                <a className="navbar-item" href="/aboutpages">
                                    Tentang Perusahaan
                                </a>
                                <a className="navbar-item" href="/employeepages">
                                    Tenaga Kerja
                                </a>
                                {/* <a className="navbar-item" href="/matelpages">
                                    Data Aset Fidusia
                                </a> */}
                                <Link className="navbar-item" to="partner" spy={true} smooth={true} offset={-90} duration={500}>
                                    Mitra Kerja
                                </Link>
                            </div>
                        </div>

                        {window.location.pathname === '/' ? (
                            <Link className="navbar-item" to="layanan" spy={true} smooth={true} offset={-90} duration={500}>
                                Layanan
                            </Link>
                        ) : (
                            <a className="navbar-item" href="/">
                                Layanan
                            </a>
                        )}

                        {window.location.pathname === '/' ? (
                            <Link className="navbar-item" to="gallery" spy={true} smooth={true} offset={-90} duration={500}>
                                Gallery
                            </Link>
                        ) : (
                            <a className="navbar-item" href="/gallerypages">
                                Gallery
                            </a>
                        )}

                        {window.location.pathname === '/' ? (
                            <Link className="navbar-item" to="blog" spy={true} smooth={true} offset={-80} duration={500}>
                                Blog
                            </Link>
                        ) : (
                            <a className="navbar-item" href="/blogpages">
                                Blog
                            </a>
                        )}
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">Lainnya</a>
                            <div className="navbar-dropdown has-background-info-light">
                                {window.location.pathname === '/' ? (
                                    <Link className="navbar-item" to="kontak" spy={true} smooth={true} offset={-80} duration={500} >
                                        Hubungi Kami
                                    </Link>
                                ) : (
                                    <a className="navbar-item" href="/contactpages">
                                        Hubungi Kami
                                    </a>
                                )}
                                <a className="navbar-item" href="/faqpages">
                                    FAQ
                                </a>
                            </div>
                        </div>

                        <a className="navbar-item" href="/login">
                            <button className="button is-primary">Login</button>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default PublicNavbar;