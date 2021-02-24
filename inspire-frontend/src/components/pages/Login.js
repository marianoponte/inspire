import React, { useState, useEffect } from 'react';
import '../../stylesheets/login.css';
import CODIGO_HTTP from '../../utils/Utils'
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import Register from './Register';
import HOST from '../../utils/Host';

const Login = () => {

    const history = useHistory();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        document.getElementById('navigation-bar').style.display = "none";
        verifyRoute();
        return () => {
            document.getElementById('navigation-bar').style.display = "flex";
        }
    }, []);

    const verifyRoute = () => {

        if (localStorage.getItem('token')) {
            return history.push('/home');
        }
    }

    const handleChange = async e => {
        await setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch(`http://${HOST}:5000/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });

        response = await response.json();

        console.log("Response: ", response);

        if (response.code == CODIGO_HTTP.OK) {
            localStorage.setItem("token", response.token)
            history.push('/home');
        } else {
            swal("Error", response.mensaje, "error")
        }
    }

    return (
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">Bienvenido!</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-label-group">
                                            <input type="email" id="inputEmail" name="email" className="form-control" onChange={e => handleChange(e)} placeholder="Email" required />
                                            <label for="inputEmail">Email</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" name="password" className="form-control" onChange={e => handleChange(e)} placeholder="Contraseña" required />
                                            <label for="inputPassword">Contraseña</label>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Iniciar sesión</button>
                                    </form>
                                    <div className="text-center">
                                        <Register />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;