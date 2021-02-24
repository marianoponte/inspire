import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import {useHistory} from "react-router-dom";
import swal from 'sweetalert';
import CODIGO_HTTP from '../../utils/Utils';
import HOST from '../../utils/Host';

const AddMember = () => {

  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return history.push('/login');} }, [])

  const [modal, setModal] = useState(false);

  const [member, setMember] = useState({ 
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      fecha_de_nacimiento: "",
      comentario: "",
      permiso: ""
  });

  const cleanForm = () => { setMember({      
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    fecha_de_nacimiento: "",
    comentario: "",
    permiso: "" })}

  const toggle = () => {
      cleanForm();
      setModal(!modal);
  }

  const onSubmit = async () => {
    let response = await fetch(`http://${HOST}:5000/members`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
  });

    console.log(JSON.stringify(member))
    response = await response.json();

    if (response.code == CODIGO_HTTP.CREATED) {
      swal("Bien!", "Se ha creado correctamente el miembro", "success").then(() => { setModal(!modal); window.location.reload()})
    } else {
      swal("Error", response.mensaje , "error") 
    }

  }

  const { nombre, apellido, email, password, fecha_de_nacimiento, comentario, permiso} = member;
    
  const onInputChange = e => {
        setMember({...member, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch(`http://${HOST}:5000/members`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
  });

    console.log(JSON.stringify(member))
    response = await response.json();

    if (response.code == CODIGO_HTTP.CREATED) {
      swal("Bien!", "Se ha creado correctamente el miembro", "success").then(() => setModal(!modal))
    } else {
      swal("Error", response.mensaje , "error") 
    }
  }

  return (
    <div>
      <Button className="btn btn-primary btn-add" color="btn btn-primary" onClick={toggle}>Crear Miembro</Button>
      <Modal isOpen={modal}>
      <Form id="formAddMember" onSubmit={handleSubmit}>
        <ModalHeader>Crear Miembro</ModalHeader>
        <ModalBody>
      <FormGroup>
        <Label for="memberName">Nombre</Label>
        <Input type="text" id="memberName" name="nombre" placeholder="Nombre de cliente" value={nombre} onChange={e => onInputChange(e)} required />
      </FormGroup>
      <FormGroup>
        <Label for="memberLastName">Appellido</Label>
        <Input type="text" id="memberLastName" name="apellido"  placeholder="Apellido de cliente" value={apellido} onChange={e => onInputChange(e)} required />
      </FormGroup>
      <FormGroup>
        <Label for="memberEmail">Email</Label>
        <Input type="text" id="memberEmail" name="email" placeholder="Email de cliente" value={email} onChange={e => onInputChange(e)} required />
      </FormGroup>
      <FormGroup>
        <Label for="memberPassword">Password</Label>
        <Input type="password" id="memberPassword" name="password" placeholder="Contraseña de cliente" value={password} onChange={e => onInputChange(e)} required />
      </FormGroup>
      <FormGroup>
        <Label for="memberBirthDate">Fecha de Nacimiento</Label>
        <Input type="date" id="memberBirthDate" name="fecha_de_nacimiento" value={fecha_de_nacimiento} onChange={e => onInputChange(e)} />
      </FormGroup>
      <FormGroup>
        <Label for="memberComment">Comentario</Label>
        <Input type="textbox" id="memberComment" name="comentario" placeholder="Comentario" value={comentario} onChange={e => onInputChange(e)} />
      </FormGroup>
      <FormGroup>
        <Label for="memberRol">Permiso</Label>
        <Input type="select" id="memberRol" name="permiso" placeholder="Permiso" value={permiso} onChange={e => onInputChange(e)} required>
        <option>Usuario</option>
        <option>Admin</option>
        </Input>
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
}

export default AddMember;