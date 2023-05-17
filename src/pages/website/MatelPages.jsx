import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";
import Matel from "../../components/websites/Matel";
import PublicNavbar from '../../components/websites/PublicNavbar';
import PublicFooter from '../../components/websites/PublicFooter';

const MatelPages = () => {
    const dispatch = useDispatch();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            <h1>Anda harus login terlebih dahulu!</h1>
        }
    }, [isError]);
    return (
        <React.Fragment>
            <PublicNavbar />
            <div style={{ background: 'linear-gradient(to bottom, #b4e5f9 2%, #ffffff 65%)', backgroundSize: `cover`, backgroundPosition: `center` }}>
                <div className="container" style={{paddingTop: '15px'}}>
                    <Matel />
                </div>
            </div>
            <PublicFooter />
        </React.Fragment>
    );
};

export default MatelPages;