/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import PublicNavbar from "../../components/websites/PublicNavbar";
import PublicFooter from "../../components/websites/PublicFooter";
import "moment/locale/id";
import { BsFillPersonFill, BsCalendarDate, BsFillArrowRightCircleFill } from "react-icons/bs";
import './../../components/websites/style.css';
import DOMPurify from "dompurify";

function BlogPages() {
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [shows, setShows] = useState(3);
    const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        moment.locale("id");
        getCount();

        axios.get('http://localhost:5000/listblogs')
            .then(response => {
                setBlogs(response.data);
                return response.data;
            })
            .then(blog => {
                const userIds = blog.map(blog => blog.userId);
                return Promise.all(
                    userIds.map(userId =>
                        axios.get(`http://localhost:5000/listusers/${userId}`)
                    )
                );
            })
            .then(responses => {
                const users = responses.map(response => response.data);
                setUsers(users);
            })
            .catch(error => console.error(error));
    }, []);

    const getCount = async () => {
        const responseBlog = await axios.get("http://localhost:5000/blogs/count");
        setTotalRows(responseBlog.data.count);
    }

    return (
        <React.Fragment>
            <PublicNavbar />
            <div style={{ background: 'linear-gradient(to bottom, #b4e5f9 2%, #ffffff 65%)', backgroundSize: `cover`, backgroundPosition: `center`, paddingTop: '70px' }}>
                <div className="container">
                    {/* <h1 className="title has-text-centered mt-5">Blog</h1> */}
                    <nav class="breadcrumb mt-5" aria-label="breadcrumbs">
                        <ul>
                            <li><a href="/">Beranda</a></li>
                            <li class="is-active"><a href="#">Blog</a></li>
                        </ul>
                    </nav>
                    <div className="section">
                        {blogs.slice(0, shows).map((blog, index) => (
                            <div className="pb-6">
                                <div className="columns has-background-light" style={{ height: '250px', width: '100%', objectFit: 'cover' }} >
                                    <div className="column is-4">
                                        <a href={`/blogpages/${blog.uuid}`}>
                                            <img src={blog.urlImage} alt={blog.tittle} style={{ height: '220px', width: '100%', objectFit: 'cover' }} />
                                        </a>
                                    </div>
                                    <div className="column">
                                        <p># {blog.id}</p>
                                        <a href={`/blogpages/${blog.uuid}`}>
                                            <div className="titleBlog2 subtitle is-5 pt-4">
                                                <strong> {blog.tittle}</strong>
                                            </div>
                                        </a>
                                        <p
                                            className="contentBlog2"
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(blog.content),
                                            }}
                                        ></p>
                                        <a href={`/blogpages/${blog.uuid}`}>
                                            <div className="columns pt-4">
                                                <div className="column is-10 subtitle is-5">
                                                    <span className="pr-1">
                                                        <BsFillPersonFill />
                                                    </span>
                                                    <span style={{ fontSize: '15px' }}>
                                                        {users.find(user => user.id === blog.userId)?.name}
                                                    </span>
                                                    <br />
                                                    <span className="pr-1">
                                                        <BsCalendarDate />
                                                    </span>
                                                    <span style={{ fontSize: '15px' }}>
                                                        {moment(blog.updatedAt).format('Do MMMM  YYYY')}
                                                    </span>
                                                </div>
                                                <div className="column is-2 mt-4">
                                                    <BsFillArrowRightCircleFill />
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        ))}
                        {blogs.length > 0 && shows < totalRows && (
                            <div className='has-text-centered'>
                                <button className="button is-info is-rounded" onClick={() => setShows(shows + 3)}>Lihat lebih banyak</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <PublicFooter />
        </React.Fragment>
    );
}

export default BlogPages;