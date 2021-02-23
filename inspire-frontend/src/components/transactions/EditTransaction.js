import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';

const EditTransaction = () => {

    let history = useHistory();

    const { txtId } = useParams();

    const [transaction, setTransaction] = useState({});

    const [id_miembro, setId_miembro] = useState();

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else loadTransaction();
    }, []);

    const loadTransaction = async () => {
        let response = await fetch(`http://localhost:5000/transactions/${txtId}`, {
            method: "GET",
        });
        response = await response.json();

        setTransaction(response.transaccion);
        if (response.transaccion.miembro)
            setId_miembro(response.transaccion.miembro.id)
        else 
            setId_miembro(null)
        setLoading(false)
    }

    const { tipo, monto, puntos, fecha_creacion, fecha_ultima_actualizacion, descripcion } = transaction;


    const onCancel = () => {
        return history.push('/transactions')
    }

    return (
        <div> { (!loading) ?
            <div className="container fluid">
                <Form id="formEditTransaction">
                    <FormGroup>
                        <Label for="txtType">Tipo</Label>
                        <Input type="text" id="txtType" name="tipo" placeholder="Tipo de transacción" value={tipo} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="txtMember">Miembro</Label>
                        <Input type="textbox" id="txtMember" name="id_miembro" placeholder="Miembro de transacción" value={id_miembro} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="txtAmount">Monto</Label>
                        <Input type="text" id="txtAmount" name="monto" placeholder="Monto de transacción" value={monto} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="txtPoints">Puntos</Label>
                        <Input type="integer" id="txtPoints" name="puntos" placeholder="Puntos de transacción" value={puntos} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="txtRegistrationDate">Fecha de creación</Label>
                        <Input type="date" id="txtRegistrationDate" name="fecha_creacion" placeholder="Fecha de creación de transacción" value={fecha_creacion} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="txtUpdateDate">Fecha de actualización</Label>
                        <Input type="date" id="txtUpdateDate" name="fecha_ultima_actualizacion" placeholder="Fecha de actualización de transacción" value={fecha_ultima_actualizacion} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="txtDescription">Descripción</Label>
                        <Input type="textbox" id="txtDescription" name="descripcion" placeholder="Descripción de transacción" value={descripcion} readOnly />
                    </FormGroup>
                </Form>
                <Button color="primary" onClick={onCancel}>Cancelar</Button>
            </div> : <div className="spinner-center"><Spinner color="primary" /></div>}
        </div>
    );
};

export default EditTransaction;