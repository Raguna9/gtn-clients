import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Partner = () => {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/partner')
            .then(response => setPartners(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container is-hidden-mobile">
            <section id="partner" className='mx-6 pt-4 pb-6 mb-2'>
                <h2 className="title is-4 has-text-centered">Mitra kerja kami</h2>
                <div className="columns is-multiline">
                    {partners.map((partner) => (
                        <div className="column is-2" key={partner.uuid}>
                            <img src={partner.urlImage} alt={partner.name} />
                            {/* <h3 className="title is-5">{partner.name}</h3> */}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Partner;