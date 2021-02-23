import React from 'react';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

const LogOut = () => {

    const history = useHistory();

    const toggle = () => {
        swal({
            title: "¿Estás seguro que quiere cerrar sesión?",
            text: "Se te redireccionará al login",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willLogOut) => {
                if (willLogOut) {
                    localStorage.removeItem('token');
                    return history.push('/login');
                }
            }
            );
    }

    return (
        <div>
            <button type="button" class="btn btn-secondary" onClick={toggle}>Cerrar Sesión</button>
        </div>
    );
};

export default LogOut;