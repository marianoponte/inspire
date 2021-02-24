import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Spinner } from 'reactstrap';
import AddProduct from './AddProduct';
import Producto from './Producto';
import jwt_decode from 'jwt-decode';
import HOST from '../../utils/Host';

const ProductsTable = () => {

    let history = useHistory();

    const [products, setProducts] = useState([]);

    const [productsOriginal, setProductsOriginal] = useState([]);

    const [loading, setLoading] = useState(true)

    const [isAdmin, setIsAdmin] = useState(false)

    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else {
            var token = localStorage.getItem('token')
            var memberLogged = jwt_decode(token);
            if (memberLogged.permiso == "Admin") {
                setIsAdmin(true)
            }
            getProducts();
        }
    }, []);

    const getProducts = async () => {
        let response = await fetch(`http://${HOST}:5000/products`, {
            method: "GET"
        });

        response = await response.json();

        console.log("Response: ", response);
        setProducts(response.productos);
        setProductsOriginal(response.productos);
        setLoading(false);
    }

    const onInputChange = async e => {
        await setSearch(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        SearchProducts()
    }

    const SearchProducts = () => {
        var products = productsOriginal
        var filteredProducts = products.filter(product => {
            if (product.nombre.toString().toLowerCase().includes(search.toLowerCase()) || product.descripcion.toString().toLowerCase().includes(search.toLowerCase()))
                return product;
        })
        setProducts(filteredProducts);
    }

    return (
        <div><div className="buttons-line d-flex justify-content-between align-items-center">
            <form className="form-inline my-2 my-lg-0 form-search" onSubmit={handleSubmit}>
                <input className="form-control mr-sm-1" id="input-search-product" type="text" placeholder="Nombre o descripción..." name="search" value={search} onChange={onInputChange} />
                <button className="btn btn-secondary my-2 my-sm-0" id="btn-search-product" type="submit">Buscar</button>
            </form>
            {isAdmin ? <AddProduct /> : null}  </div>
            { (!loading) ?
                <div className="col-12 p-2 row">
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