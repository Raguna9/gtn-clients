/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy } from 'react';
import PublicNavbar from "../../components/websites/PublicNavbar";
import PublicFooter from "../../components/websites/PublicFooter";
import './../../components/websites/style.css';

const Contact = lazy(() => import('../../components/websites/Kontak'));

function ContactPages() {
    return (
        <React.Fragment>
            <PublicNavbar />
            <Contact />
            <PublicFooter />
        </React.Fragment>
    );
}

export default ContactPages;