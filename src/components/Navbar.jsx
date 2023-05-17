/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut, } from "react-icons/io5";
import { BsBank, BsChatLeftTextFill } from "react-icons/bs";
import { RiGalleryFill, RiQuestionAnswerLine } from "react-icons/ri";
import { FaBloggerB, FaUserTie, FaUserFriends } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { useSelector } from "react-redux";
import { AiFillBook } from "react-icons/ai";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [isActive, setIsActive] = useState(false);

    const logout = () => {
        if (window.confirm("Are you sure for logout?")) {
            dispatch(LogOut());
            dispatch(reset());
            navigate("/login");
        }
    };

    return (
        <div>
            <nav
                className="navbar is-fixed-top has-shadow"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <NavLink to="/dashboard" className="navbar-item">
                        {/* <img src={logo} width="112" height="28" alt="logo" /> */}
                        <h1 className="title is-hoverable" style={{ fontFamily: "'Sacramento', sans-serif", color: "black" }}><strong>{user && user.role}</strong> panel</h1>
                    </NavLink>

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

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a
                                    href={`/`}
                                    className="button is-link"
                                    target="_blank" rel="noreferrer"
                                >
                                    Website
                                </a>
                                <button onClick={logout} className="button is-light">
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="navbarBasicExample" className={` is-hidden-desktop navbar-menu ${isActive ? 'is-active' : ''}`}>
                    <div className="navbar-end mr-2">
                        <span className="menu-label">General</span>
                        <NavLink className="navbar-item" to={"/dashboard"}>
                            <span style={{ fontSize: '14px' }}>
                                <IoHome /> Dashboard
                            </span>
                        </NavLink>
                        <NavLink className="navbar-item" to={"/blogs"}>
                            <span style={{ fontSize: '14px' }}>
                                <FaBloggerB /> Blog
                            </span>
                        </NavLink>
                        <NavLink className="navbar-item" to={"/matels"}>
                            <span style={{ fontSize: '14px' }}>
                                <AiFillBook /> Aset Fidusia
                            </span>
                        </NavLink>
                        {user && user.role === "admin" && (
                            <div>
                                <span className="menu-label">Admin</span>
                                <NavLink className="navbar-item" to={"/inboxs"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <BsChatLeftTextFill /> Pesan
                                    </span>
                                </NavLink>
                                <NavLink className="navbar-item" to={"/faqs"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <RiQuestionAnswerLine /> FAQ
                                    </span>
                                </NavLink>
                                <NavLink className="navbar-item" to={"/employees"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <FaUserTie /> TK Internal
                                    </span>
                                </NavLink>
                                <NavLink className="navbar-item" to={"/externalemployees"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <FaUserFriends /> TK Eksternal
                                    </span>
                                </NavLink>
                                <NavLink className="navbar-item" to={"/partners"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <BsBank /> Mitra Kerja
                                    </span>
                                </NavLink>
                                <NavLink className="navbar-item" to={"/gallerys"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <RiGalleryFill /> Galeri
                                    </span>
                                </NavLink>
                            </div>
                        )}
                        <span className="menu-label">Settings</span>
                        {user && user.role === "admin" && (
                            <div>
                                <NavLink className="navbar-item" to={"/users"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <IoPerson /> Users
                                    </span>
                                </NavLink>
                            </div>
                        )}
                        <button onClick={logout} className="button is-white pl-3">
                            <span style={{ fontSize: '14px' }}>
                                <IoLogOut /> Logout
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;