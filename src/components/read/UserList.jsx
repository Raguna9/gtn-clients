// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";

const UserList = () => {
    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus data ini?`);

        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            getUsers();
        }
    };

    //swr
    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users");
        return response.data;
    };

    const {data} = useSWR('users', getUsers);
    if(!data) return <h2 className="tittle p-auto">Loading...</h2>

    return (
        <div className="container mr-2">
            <h1 className="title">Users</h1>
            <h2 className="subtitle">List data Users</h2>
            <Link to="/users/add" className="button is-primary mb-2">
                Tambah Data
            </Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Aksi</th>
                    </tr>
                </thead>                
                <tbody>
                    {data.map((user, index) => (
                        <tr key={user.uuid}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link
                                    to={`/users/edit/${user.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteUser(user.uuid)}
                                    className="button is-small is-danger ml-1"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;