/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublicNavbar from "../../components/websites/PublicNavbar";
import PublicFooter from "../../components/websites/PublicFooter";

function FAQPages() {
    const [faqs, setFaqs] = useState([]);
    const [showAnswers, setShowAnswers] = useState({});
    const [activeQuestion, setActiveQuestion] = useState(-1);

    useEffect(() => {
        const getFaqs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/faqs');
                setFaqs(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getFaqs();
    }, []);

    const handleClick = (index) => {
        setActiveQuestion(index === activeQuestion ? -1 : index);
        setShowAnswers({
            ...showAnswers,
            [index]: !showAnswers[index],
        });
    };
    return (
        <React.Fragment>
            <PublicNavbar />
            <div style={{ background: 'linear-gradient(to bottom, #b4e5f9 2%, #ffffff 65%)', backgroundSize: `cover`, backgroundPosition: `center`, paddingTop: '100px' }}>
                <div className="container pb-6">
                        <nav class="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <li><a href="/">Beranda</a></li>
                                <li class="is-active"><a href="#">FAQ</a></li>
                            </ul>
                        </nav>
                        <h1 className="title is-5 has-text-centered">Frequently Asked Questions</h1>
                        <p className="subtitle has-text-centered is-">Berikut beberapa pertanyaan yang sering ditanyakan</p>
                        <div className="columns mx-6">
                            <div className="column">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="card mt-4">
                                        <button
                                            className="button is-info is-fullwidth is-outlined"
                                            onClick={() => handleClick(index)}
                                        >
                                            {faq.question}
                                        </button>
                                        {index === activeQuestion && (
                                            <p className='px-3 py-3'>{faq.answer}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>
            </div>
            <PublicFooter />
        </React.Fragment>
    );
}

export default FAQPages;