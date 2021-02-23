import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import CODIGO_HTTP from '../../utils/Utils'
import swal from 'sweetalert';

const Register = () => {

    const [modal, setModal] = useState(false);

    const [fieldRequireds, setFieldRequireds] = useState(true);

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
      permiso: ""
    })}
  
    const toggle = () => {
        cleanForm();
        setModal(!modal);
    }

    const handleSubmitRegister = (event) => {
            doRegister(event)
      }

      const checkFieldsRequired = () => {
        if (!nombre) {
            setFieldRequireds(false)
            return swal("Error", "Campo nombre es requerido", "error")

        }
        if (!apellido) {
            setFieldRequireds(false)
            return swal("Error", "Campo apellido es requerido", "error")
          
        }
        if (!email) {
            setFieldRequireds(false)
            return swal("Error", "Campo email es requerido", "error")
        }
            
        if (!password) {
            setFieldRequireds(false)
            return swal("Error", "Campo password es requerido", "error")
        }
        return setFieldRequireds(true)
      }

      const doRegister = async (event) => {
        event.preventDefault();
        console.log("REGISTER")
        let response = await fetch('http://localhost:5000/register', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        });
          console.log(JSON.stringify(member))
          response = await response.json();
          console.log(response)
          if (response.code == CODIGO_HTTP.CREATED) {
              swal("Bien!", "Ya estás inscripto como miembro", "success")
              .then(() => {toggle()})
          } else {
              swal("Error", response.mensaje, "error")
          }
    }

    const { nombre, apellido, email, password, fecha_de_nacimiento} = member;
    
    const onInputChange = e => {
          setMember({...member, [e.target.name]: e.target.value})
    };

    return (
        <div>
            <a class="small" onClick={toggle}>Registrate aquí!</a>
            <Modal isOpen={modal} toggle={toggle}>
            <Form id="formAddMember" onSubmit={handleSubmitRegister}>
                <ModalHeader toggle={toggle}>Crea tu usuario</ModalHeader>
                <ModalBody>
                        <FormGroup>
                            <Label for="memberName">Nombre</Label>
                            <Input type="text" id="memberName" name="nombre" placeholder="Nombre" value={nombre} onChange={e => onInputChange(e)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="memberLastName">Appellido</Label>
                            <Input type="text" id="memberLastName" name="apellido" placeholder="Apellido" value={apellido} onChange={e => onInputChange(e)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="memberEmail">Email</Label>
                            <Input type="text" id="memberEmail" name="email" placeholder="Email" value={email} onChange={e => onInputChange(e)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="memberPassword">Password</Label>
                            <Input type="password" id="memberPassword" name="password" placeholder="Contraseña" value={password} onChange={e => onInputChange(e)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="memberBirthDate">Fecha de Nacimiento</Label>
                            <Input type="date" id="memberBirthDate" name="fecha_de_nacimiento" value={fecha_de_nacimiento} onChange={e => onInputChange(e)} />
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

export default Register;