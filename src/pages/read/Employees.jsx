import React, { useEffect } from "react";
import Layout from "../Layout";
import EmployeeList from "../../components/read/EmployeeList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Employees = () => {
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
            <EmployeeList />
        </Layout>
    );
};

export default Employees;