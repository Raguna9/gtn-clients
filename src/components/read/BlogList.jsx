import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import './../websites/style.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [isOpen, setIsOpen] = useState(null);

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = async () => {
        const response = await axios.get("http://localhost:5000/blogs");
        setBlogs(response.data);
    };

    const deleteBlog = async (blogId) => {
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');

        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/blogs/${blogId}`);
            getBlogs();
        }
    };

    return (
        <div className="container mr-2">
            <h1 className="title">Blog</h1>
            <h2 className="subtitle">List data Blog</h2>
            <Link to="/blogs/add" className="button is-primary mb-2">
                Tambah Data
            </Link>
            <table className="table is-striped is-fullwidth has-shadow">
                <thead>
                    <tr style={{ fontSize: '15px' }}>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Konten</th>
                        <th>Gambar</th>
                        <th>Penulis</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                {blogs.map((blog, index) => (
                    <tbody key={blog.uuid} style={{ fontSize: '15px' }}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>
                                <p className="titleBlog3">
                                    {blog.tittle}
                                </p>
                            </td>
                            <td>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(blog.content),
                                    }}
                                    className='contentBlog3'
                                ></p>
                            </td>
                            <td>
                                <img src={blog.urlImage} alt={blog.tittle} onClick={() => setIsOpen(blog.urlImage)} />
                            </td>
                            <td>{blog.user.name}</td>
                            <td style={{ width: "150px" }}>
                                <Link
                                    to={`/blogs/edit/${blog.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteBlog(blog.uuid)}
                                    className="button is-small is-danger ml-1"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>

            {isOpen &&
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => setIsOpen(null)} />
                    <div className="modal-content">
                        <p className="image">
                            <img src={isOpen} alt={isOpen} />
                        </p>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                        onClick={() => setIsOpen(null)} />
                </div>
            }
        </div>
    );
};

export default BlogList;