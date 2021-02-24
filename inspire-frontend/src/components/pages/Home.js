import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import CODIGO_HTTP from '../../utils/Utils'
import swal from 'sweetalert';
import {Spinner} from 'reactstrap';

const Home = () => {

    const history = useHistory();

    const [info, setInfo] = useState({
        nombre: "",
        apellido: "",
        puntos: ""
    });

    const [loading, setLoading] = useState(true)

    const getMember = async (email) => {
        let response = await fetch(`http://localhost:5000/members?email=${email}`, {
            method: "GET"
        });
        response = await response.json();
        console.log(response)
        setLoading(false)
        if (response.code == CODIGO_HTTP.OK) {
            console.log("Miembro filtrado: ", response.miembros[0])
            return response.miembros[0]
        } else {
            swal("Error", response.mensaje, "error")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            var token = localStorage.getItem('token')
            var member = jwt_decode(token);
            if (member.permiso == "Admin") {
                document.getElementById('member-navbar').style.display = "flex";
            } else {
                document.getElementById('member-navbar').style.display = "none";
            }
            getMember(member.email)
                .then(r => {
                    setInfo({
                        nombre: r.nombre,
                        apellido: r.apellido,
                        puntos: r.puntos
                    })
                })
        } else {
            return history.push('/login');
        }
    }, []);

    return (
        <div>
            {(!loading) ? 
        <div>
            <div className="jumbotron">
                <div className="container">
                <h1 className="display-3">Bienvenido {info.nombre} {info.apellido}!</h1>
                <h1>Tenes <strong>{info.puntos}</strong> Puntos</h1>
                </div> 
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"> 
                        <h2>Programa de lealtad</h2>
                        <p>Queremos que tengas una experiencia positiva y recompensarte a vos y a los clientes que compran o se comprometen con la marca una y otra vez.</p>
                        <div className="align-items-center text-center d-flex"><i class="fa fa-cart-plus fa-3x  mx-auto d-flex" aria-hidden="true"></i></div>
                    </div>
                    <div className="col-md-4"> 
                        <h2>Puntos</h2>
                        <p>Se te asignaron 500 puntos al momento de registrarte y además por cada $1 gastado, en compras con nosotros, obtendrás 0.5 puntos que se irán acumulando ¡sin límite!</p>
                        <div className="align-items-center text-center d-flex"><i className="fa fa-money fa-3x  mx-auto d-flex" aria-hidden="true"></i></div>
                    </div>
                    <div className="col-md-4 align-items-center"> 
                        <h2>Canjes</h2>
                        <p>¡Podrás canjear los puntos acumulados por cualquier producto de nuestro catálogo! Recibirás un voucher con un código único y con 30 días de validación.</p>
                        <div className="align-items-center text-center d-flex"><i className="fa fa-cart-arrow-down fa-3x mx-auto d-flex"></i></div>
                    </div>
                </div>
            </div>
        </div>
            : <div className="spinner-center"><Spinner color="primary"/></div>}
        </div>
    );
};

export default Home;