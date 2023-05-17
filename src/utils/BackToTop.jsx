import React, { useState, useEffect } from 'react';
import { BsArrowUpCircle } from "react-icons/bs";



const BackToTop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
            <div>
                {showButton && (
                    <BsArrowUpCircle className='is-size-1 has-text-info' onClick={handleClick}
                        style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px",
                            zIndex: "2",
                            cursor: "pointer"
                        }}>
                    </BsArrowUpCircle >
                )}
            </div>
    );
};

export default BackToTop;