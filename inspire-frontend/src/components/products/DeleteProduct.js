import React from 'react';
import swal from 'sweetalert';
import CODIGO_HTTP from '../../utils/Utils'
import { Button } from 'reactstrap';
import HOST from '../../utils/Host';

const DeleteProduct = (props) => {
    
    const { productId } = props

    const deleteProduct = async () => {
        let response = await fetch(`http://${HOST}:5000/products/${productId}`, {
            method: "DELETE",
        });
        response = await response.json();
        if (response.code == CODIGO_HTTP.OK) {
            swal("Bien!", "Producto eliminado con éxito!", "success").then(() => window.location.reload());
        } else {
            swal("Error", response.mensaje, "error")
        }
    }

    const toggle = () => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no se podrá recuperar el producto",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                deleteProduct()
            }
          });
    }

    return (
        <div>
             <Button className="btn btn-primary btn-block" color="danger" onClick={toggle}>Eliminar</Button>
        </div>
    );
};

export default DeleteProduct;