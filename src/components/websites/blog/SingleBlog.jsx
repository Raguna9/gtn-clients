/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "moment/locale/id";
import { BsFillPersonFill, BsCalendarDate } from "react-icons/bs";
import moment from 'moment';
import DOMPurify from "dompurify";

const SingleBlog = () => {
    const [tittle, setTittle] = useState("");
    const [content, setContent] = useState("");
    const [update, setUpdate] = useState("");
    const [preview, setPreview] = useState("");
    const [msg, setMsg] = useState("");
    const [userName, setUserName] = useState([]);
    const { id } = useParams();

    const style = {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        textOverflow: 'ellipsis',
        maxWidth: '450px'
    }

    useEffect(() => {
        moment.locale("id");

        const getBlogById = () => {
            axios
                .get(`http://localhost:5000/listblogs/${id}`)
                .then((response) => {
                    setTittle(response.data.tittle);
                    setContent(response.data.content);
                    setUpdate(response.data.updatedAt);
                    setPreview(response.data.urlImage);
                    return response.data.userId; // Return userId to the next promise
                })
                .then((userId) => {
                    return axios.get(`http://localhost:5000/listusers/${userId}`);
                })
                .then((response) => {
                    setUserName(response.data.name); // Set the user name in state
                })
                .catch((error) => {
                    if (error.response) {
                        setMsg(error.response.data.msg);
                    }
                });
        };
        getBlogById();
    }, [id]);

    return (
        <div className="container mt-6 pt-4">
            <nav className="breadcrumb mt-5" aria-label="breadcrumbs">
                <ul>
                    <li><a href="/">Beranda</a></li>
                    <li><a href="/blogpages">Blog</a></li>
                    <li className="is-active"><a href="#" aria-current="page" style={style}>{tittle}</a></li>
                </ul>
            </nav>
            <div className="section">
                <h1>{msg}</h1>
                <div className="box">
                    <div className="mx-4">
                        <img src={preview} alt={tittle} style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
                        <p className="subtitle is-6 pt-3" >
                            <span className="pr-1">
                                <BsFillPersonFill />
                            </span>
                            <span style={{ fontSize: '14px' }}>
                                {userName}
                            </span>
                            <span className="pl-5 pr-1">
                                <BsCalendarDate />
                            </span>
                            <span style={{ fontSize: '14px' }}>
                                {moment(update).format('dddd, Do MMMM  YYYY')}
                            </span>
                        </p>
                        <p className="title is-4 mt-2">{tittle}</p>
                        <p
                            className="content"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(content),
                            }}
                        ></p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SingleBlog;