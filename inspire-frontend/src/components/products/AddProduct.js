import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import CODIGO_HTTP from '../../utils/Utils';
import HOST from '../../utils/Host';

const AddProduct = () => {

    const [product, setProduct] = useState({
        nombre: "",
        descripcion: "",
        puntos: "",
        urlImage: ""
    })

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch(`http://${HOST}:5000/products`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            response = await response.json();
            if (response.code == CODIGO_HTTP.CREATED) {
                swal("Bien!", "Se agregó el nuevo producto al catálogo!", "success").then(() => {
                    window.location.reload();
                })
            } else {
                swal("Error", "No se pudo crear la tranacción", "error")
            } 
    }   

    const { nombre, descripcion, puntos, urlImage } = product

    const onInputChange = e => {
        setProduct({...product, [e.target.name]: e.target.value})
    };

    return (
        <div>
            <Button className="btn btn-primary btn-add" color="btn btn-primary" id="btn-add-product" onClick={toggle}>Agregar Producto</Button>
            <Modal isOpen={modal}>
            <Form id="formAddProduct" onSubmit={handleSubmit}>
                <ModalHeader>Agregar Producto</ModalHeader>
                <ModalBody>
                        <FormGroup>
                            <Label for="productName">Nombre</Label>
                            <Input type="text" id="productName" name="nombre" placeholder="Nombre de producto" value={nombre} onChange={e => onInputChange(e)} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="productDescription">Descripción</Label>
                            <Input type="text" id="productDescription" name="descripcion" placeholder="Descripción de producto" value={descripcion} onChange={e => onInputChange(e)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="productPoints">Puntos</Label>
                            <Input type="integer" id="productPoints" name="puntos" placeholder="Puntos de producto" value={puntos} onChange={e => onInputChange(e)} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="productURLImage">Imagen URL</Label>
                            <Input type="text" id="productURLImage" name="urlImage" placeholder="URL de la imagen de producto" value={urlImage} onChange={e => onInputChange(e)} required/>
                        </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">Aceptar</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
};

export default AddProduct;