import React, { useState, useEffect } from 'react';
import '../../stylesheets/login.css';

const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = async e => {
        await setForm({ ...form, [e.target.name]: e.target.value })
    }

    const logIn = async () => {
        //await, GET pasando como parametros el form.
        alert(form.email, form.password, "hola")
    }

    return (
        <div class="container-fluid">
            <div class="row no-gutter">
                <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div class="col-md-8 col-lg-6">
                    <div class="login d-flex align-items-center py-5">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-9 col-lg-8 mx-auto">
                                    <h3 class="login-heading mb-4">Bienvenido!</h3>
                                    <form>
                                        <div class="form-label-group">
                                            <input type="email" id="inputEmail" name="email" class="form-control" onChange={e => handleChange(e)} placeholder="Email" required autofocus />
                                            <label for="inputEmail">Email</label>
                                        </div>
                                        <div class="form-label-group">
                                            <input type="password" id="inputPassword" name="password" class="form-control" onChange={e => handleChange(e)} placeholder="Contraseña" required />
                                            <label for="inputPassword">Contraseña</label>
                                        </div>
                                        <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="button" onClick={() => logIn()}>Iniciar sesión</button>
                                    </form>
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