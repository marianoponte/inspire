import React from 'react';
import Canje from '../canje/Canje';
import DeleteProduct from './DeleteProduct';

const Producto = (props) => {

    const { id, nombre, urlImage, puntos, descripcion } = props.producto
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
                    <DeleteProduct 
                        productId={id}/>
                </div>
            </div>
        </div>
    );
};

export default Producto;