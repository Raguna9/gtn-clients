import React, { useEffect } from "react";
import Layout from "../Layout";
import FormEditMatel from "../../components/update/FormEditMatel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const EditMatel = () => {
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
            <FormEditMatel />
        </Layout>
    );
};

export default EditMatel;