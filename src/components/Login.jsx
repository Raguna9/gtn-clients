import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import logo from "./../assets/logo/logogtn.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    };

    return (
        <div className="hero-body is-fullheight is-fullwidth has-background-light">
            <div className="container">
                <figure className="has-text-centered pb-5">
                    <img src={logo} width="150" height="28" alt="PT. GTN" />
                </figure>
                <div className="columns is-centered">
                    <div className="column is-4">
                        <h1 className="title has-text-centered is-4">Sign In</h1>
                        <form onSubmit={Auth}>

                            <div className="has-text-centered">
                                <span className="has-text-light">.
                                    {isError &&
                                        <span className="has-text-danger">{message} </span>
                                    }
                                </span>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email..."
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="******"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                    />
                                    &nbsp;Show Password
                                </label>
                            </div>
                            <div className="field mt-5">
                                <button
                                    type="submit"
                                    className="button is-success is-fullwidth"
                                >
                                    {isLoading ? "Loading..." : "Login"}
                                </button>
                            </div>
                        </form>
                        <p className="has-text-centered mt-6 is-size-7">
                            © 2023 PT. Global Litigation Nusantara
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
