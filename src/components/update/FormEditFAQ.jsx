/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditFAQ = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getFAQById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/faqs/${id}`
                );
                setQuestion(response.data.question);
                setAnswer(response.data.answer);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getFAQById();
    }, [id]);

    const updateFAQ = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("question", question);
        formData.append("answer", answer);
        try {
            await axios.patch(`http://localhost:5000/faqs/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
            navigate("/faqs");
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancle = async (e) => {
        navigate("/faqs");
    };

    return (
        <div>
            <h1 className="title">FAQ</h1>
            <h2 className="subtitle">Edit FAQ</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateFAQ}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Pertanyaan</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        placeholder="Pertanyaan..."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Jawaban</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="Jawaban..."
                                        rows="10">
                                    </textarea>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Perbarui
                                    </button>
                                    <button type="submit" className="button is-danger ml-2" onClick={handleCancle}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEditFAQ;