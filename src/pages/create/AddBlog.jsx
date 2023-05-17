import React, { useEffect } from "react";
import Layout from "../Layout";
import FormAddBlog from "../../components/create/FormAddBlog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
    }, [isError, navigate]);
    return (
        <Layout>
            <FormAddBlog />
        </Layout>
    );
};

export default AddBlog;