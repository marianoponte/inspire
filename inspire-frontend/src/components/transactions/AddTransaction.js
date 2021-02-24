import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import CODIGO_HTTP from '../../utils/Utils';
import swal from 'sweetalert';
import HOST from '../../utils/Host';

const AddTransaction = () => {

    let history = useHistory();

    const [members, setMembers] = useState([])

    const [products, setProducts] = useState([])
  
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        return history.push('/login'); }
    else {
        getMembers();
        getProducts();
        console.log("Miembros: ", members)
        } }, [])
  
    const [modal, setModal] = useState(false);
  
    const [transaction, setTransaction] = useState({ 
        tipo: "",
        monto: "",
        id_miembro: "",
        descripcion: "",
        puntos: "",
        id_producto: ""
    });
  
    const cleanForm = () => { setTransaction({      
        tipo: "",
        monto: "",
        id_miembro: "",
        descripcion: "",
        puntos: "",
        id_producto: ""
    })}

    const getMembers = async () => {
        let response = await fetch(`http://${HOST}:5000/members`, {
            method: "GET"
        });

        response = await response.json();
        console.log("Response: ", response);
        setMembers(response.miembros);
    }

    const getProducts = async () => {
        let response = await fetch(`http://${HOST}:5000/products`, {
            method: "GET"
        });
        response = await response.json();
        console.log("Response: ", response);
        setProducts(response.productos);
    }
  
    const toggle = () => {
        cleanForm();
        setModal(!modal);
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fieldsOk = await checkFieldsRequireds()
        if (fieldsOk) {
        generateTransaction().then(transaccion => { toggle();
                    console.log(transaccion)
                   getMember(transaccion).then(
                       member => {updateMemberPoints(member, transaccion).then(() => swal("Bien!", "Se ha generado la transacción con éxito", "success").then(() => window.location.reload()) )})
            })
        } else {
            swal("Error", "Tipo Acumulo: Complete el monto \n Tipo Canje: Complete el producto", "error")
        }
    } 

    const checkFieldsRequireds = async () => {
        if (!tipo) {
            return false
        } 
        if (tipo == "Acumulo" && monto == "") {
            return false
        } 
        if (tipo == "Canje" && id_producto == "") {
            return false
        }
        return true
    }

  const getMember = async (transaccion) => {
      console.log(transaccion)
      var id_miembro = transaccion.miembro.id
    console.log(id_miembro)
    let response = await fetch(`http://${HOST}:5000/members/${id_miembro}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }})
        response = await response.json();
        if (response.code == CODIGO_HTTP.OK) {
            console.log("Miembro filtrado: ", response.miembro)
            return response.miembro
        } else {
            swal("Error", response.mensaje, "error")
        }
}

    const generateTransaction = async () => {
        let response = await fetch(`http://${HOST}:5000/transactions`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    })
        console.log(JSON.stringify(transaction))
        response = await response.json();
        console.log(response)
        if (response.code == CODIGO_HTTP.CREATED) {
            return response.transaccion 
        } else {
            swal("Error", "No se pudo crear la tranacción", "error")
        }   
    }

    const updateMemberPoints = async (member, transaction) => {
        console.log("Puntos para actualizar: ", transaction.puntos)

        var payload = {
            nombre: member.nombre,
            apellido: member.apellido,
            email: member.email,
            fecha_de_nacimiento: member.fecha_de_nacimiento,
            estado: member.estado,
            comentario: member.comentario,
            puntos: member.puntos + transaction.puntos
        }
        console.log(payload)
        let response = await fetch(`http://${HOST}:5000/members/${member.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)})

        console.log(JSON.stringify(payload))
        console.log(JSON.stringify(response))
    }
    
    const { tipo, monto, id_miembro, id_producto, descripcion } = transaction;
      
    const onInputChange = e => {
        setTransaction({...transaction, [e.target.name]: e.target.value})
    };

    return (
        <div>
            <Button className="btn btn-primary btn-add" color="btn btn-primary" onClick={toggle}>Crear Transacción</Button>
            <Modal isOpen={modal}>
            <Form id="formAddTransaction" onSubmit={handleSubmit}>
                <ModalHeader>Crear Transacción</ModalHeader>
                <ModalBody>
                        <FormGroup>
                            <Label for="txtType">Tipo</Label>
                            <Input type="select" id="txtType" name="tipo" placeholder="Tipo de transacción" value={tipo} onChange={e => onInputChange(e)} required>
                                <option value="">Elige una opción</option>
                                <option value="Acumulo">Acumulo</option>
                                <option value="Canje">Canje</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="txtAmount">Monto</Label>
                            <Input type="text" id="txtAmount" name="monto" placeholder="Monto de transacción" value={monto} onChange={e => onInputChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="txtMember">Miembro</Label>
                            <Input type="select" id="txtMember" name="id_miembro" placeholder="Miembro de transacción" value={id_miembro} onChange={e => onInputChange(e)} required >
                                <option value="">Elige una opción</option>
                                {members.map((member) => (<option value={member.id}>{member.nombre} {member.apellido}</option>))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="txtProduct">Producto</Label>
                            <Input type="select" id="txtProduct" name="id_producto" placeholder="Producto de transacción" value={id_producto} onChange={e => onInputChange(e)} >
                                <option value="">Elige una opción</option>
                                {products.map((product) => (<option value={product.id}>{product.nombre}</option>))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="txtDescription">Descripción</Label>
                            <Input type="textbox" id="txtDescription" name="descripcion" placeholder="Descripción de transacción" value={descripcion} onChange={e => onInputChange(e)} />
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

export default AddTransaction;