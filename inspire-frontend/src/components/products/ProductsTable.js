import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Producto from './Producto';

const ProductsTable = () => {

    let history = useHistory();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else getProducts();
    }, []);

    const getProducts = async () => {
        let response = await fetch('http://localhost:5000/products', {
            method: "GET"
        });

        response = await response.json();

        console.log("Response: ", response);
        setProducts(response.productos);
        setLoading(false)
    }

    return (
        <div> { (!loading) ?
            <div className="col-12 p-5 row">
                {products.map(producto => (
                    <Producto
                        key={producto.id}
                        producto={producto} />
                ))}
            </div> : <div className="spinner-center"><Spinner color="primary" /></div>}
        </div>
    );
};

export default ProductsTable;