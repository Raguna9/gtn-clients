import React, { useEffect } from "react";
import Layout from "../Layout";
import InboxList from "../../components/read/InboxList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Inboxs = () => {
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
            <InboxList />
        </Layout>
    );
};

export default Inboxs;