import React from 'react';
import PublicNavbar from "../../components/websites/PublicNavbar";
import PublicFooter from "../../components/websites/PublicFooter";
import SingleBlog from "./../../components/websites/blog/SingleBlog";

function BlogPages() {

    return (
        <React.Fragment>
            <PublicNavbar />
            <div style={{ background: 'linear-gradient(to bottom, #b4e5f9 2%, #ffffff 65%)', backgroundSize: `cover`, backgroundPosition: `center`, paddingTop: '15px' }}>
                <SingleBlog />
            </div>
            <PublicFooter />
        </React.Fragment>
    );
}

export default BlogPages;