import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';

const AddMember = () => {

  const [modal, setModal] = useState(false);

  const [member, setMember] = useState({ 
      name: "",
      lastname: "",
      email: "",
      password: ""
  });

  const cleanForm = () => { setMember({name: "",
  lastname: "",
  email: "",
  password: ""})}

  const toggle = () => {
      cleanForm();
      setModal(!modal);
  }

  const onSubmit = () => {

  }

  const { name, lastname, email, password} = member;
    
  const onInputChange = e => {
        setMember({...member, [e.target.name]: e.target.value})
  };

  return (
    <div>
      <Button className="btn btn-primary" color="btn btn-primary" id="btn-add-member" onClick={toggle}>Crear Miembro</Button>
      <Modal isOpen={modal}>
        <ModalHeader>Crear Miembro</ModalHeader>
        <ModalBody>
        <Form id="formAddMember">
      <FormGroup>
        <Label for="memberName">Nombre</Label>
        <Input type="text" id="memberName" name="name" placeholder="Nombre de cliente" value={name} onChange={e => onInputChange(e)}/>
      </FormGroup>
      <FormGroup>
        <Label for="memberLastName">Appellido</Label>
        <Input type="text" id="memberLastName" name="lastname"  placeholder="Apellido de cliente" value={lastname} onChange={e => onInputChange(e)} />
      </FormGroup>
      <FormGroup>
        <Label for="memberEmail">Email</Label>
        <Input type="text" id="memberEmail" name="email" placeholder="Email de cliente" value={email} onChange={e => onInputChange(e)} />
      </FormGroup>
      <FormGroup>
        <Label for="memberPassword">Password</Label>
        <Input type="password" id="memberPassword" name="password" placeholder="Contraseña de cliente" value={password} onChange={e => onInputChange(e)} />
      </FormGroup>
    </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>Aceptar</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddMember;