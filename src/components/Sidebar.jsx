/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut, } from "react-icons/io5";
import { BsBank, BsChatLeftTextFill } from "react-icons/bs";
import { RiGalleryFill, RiQuestionAnswerLine } from "react-icons/ri";
import { FaBloggerB, FaUserTie, FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { AiFillBook } from "react-icons/ai";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [unreadMessages, setUnreadMessages] = useState(0);

    // contoh penggunaan useEffect untuk mendapatkan data pesan dari API
    useEffect(() => {
        const fetchInboxs = async () => {
            const response = await fetch("http://localhost:5000/inboxs");
            const unreadMessages = response.data.filter((messageContent) => !messageContent.read).length;
            setUnreadMessages(unreadMessages);
        };
        fetchInboxs();
    }, []);

    const logout = () => {
        if (window.confirm("Are you sure for logout?")) {
            dispatch(LogOut());
            dispatch(reset());
            navigate("/login");
        }
    };

    return (
        <div className="container">
            <aside className="menu mt-2 pl-2 has-shadow is-hidden-mobile" style={{ position: 'fixed' }}>
                <span className="menu-label">General</span>

                <ul className="menu-list">
                    <li>
                        <NavLink className="navbar-item" to={"/dashboard"}>
                            <span style={{ fontSize: '14px' }}>
                                <IoHome /> Dashboard
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navbar-item" to={"/blogs"}>
                            <span style={{ fontSize: '14px' }}>
                                <FaBloggerB /> Blog
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navbar-item" to={"/matels"}>
                            <span style={{ fontSize: '14px' }}>
                                <AiFillBook /> Aset Fidusia
                            </span>
                        </NavLink>
                    </li>
                </ul>
                {user && user.role === "admin" && (
                    <div>
                        <span className="menu-label">Admin</span>
                        <ul className="menu-list">
                            <li>
                                <NavLink className="navbar-item" to={"/inboxs"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <BsChatLeftTextFill /> Pesan{" "}
                                        {unreadMessages > 0 && (
                                            <span className="notification">{unreadMessages}</span>
                                        )}
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="navbar-item" to={"/faqs"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <RiQuestionAnswerLine /> FAQ
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="navbar-item" to={"/employees"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <FaUserTie /> TK Internal
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="navbar-item" to={"/externalemployees"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <FaUserFriends /> TK Eksternal
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="navbar-item" to={"/partners"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <BsBank /> Mitra Kerja
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="navbar-item" to={"/gallerys"}>
                                    <span style={{ fontSize: '14px' }}>
                                        <RiGalleryFill /> Galeri
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
                <span className="menu-label">Settings</span>
                {user && user.role === "admin" && (
                    <div>
                        <ul className="menu-list">
                            <li>
                                <NavLink to={"/users"} className="navbar-item is-white has-text-left">
                                    <span style={{ fontSize: '14px' }}>
                                        <IoPerson /> Users
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
                <div>
                    <ul className="menu-list">
                        <li>
                            <a onClick={logout} className="navbar-item is-white pl-3">
                                <span style={{ fontSize: '14px' }}>
                                    <IoLogOut /> Logout
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;