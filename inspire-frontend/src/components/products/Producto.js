import React, { useState, useEffect } from 'react';
import Canje from '../canje/Canje';
import DeleteProduct from './DeleteProduct';
import jwt_decode from 'jwt-decode';

const Producto = (props) => {

    const { id, nombre, urlImage, puntos, descripcion } = props.producto

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
        var token = localStorage.getItem('token')
        var memberLogged = jwt_decode(token);
         if (memberLogged.permiso == "Admin") {
            setIsAdmin(true)
        } }
    }, []);

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={urlImage} className="card-img-top" />
                <div className="card-body">
                    <p className="card-text">{nombre}</p>
                    <p className="card-text">{descripcion}</p>
                    <p className="card-text">{puntos} Puntos</p>
                    <Canje 
                        productId={id}
                        puntos={puntos} />
                        <p></p>
                    { isAdmin && <DeleteProduct 
                        productId={id}/>}
                </div>
            </div>
        </div>
    );
};

export default Producto;