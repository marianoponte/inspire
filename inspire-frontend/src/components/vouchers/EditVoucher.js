import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import CODIGO_HTTP from '../../utils/Utils'

const EditVoucher = () => {

    let history = useHistory();

    const { voucherId } = useParams();

    const [voucher, setVoucher] = useState({});

    const [id_miembro, setId_miembro] = useState();

    const [id_producto, setId_producto] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else {
                var token = localStorage.getItem('token')
                var memberLogged = jwt_decode(token);
                if (memberLogged.permiso == "Admin") {
                    loadVoucherAdmin();
                } else {
                    loadVoucherUser(memberLogged.id);
                }
        }
    }, []);

    const loadVoucherAdmin = async () => {
        let response = await fetch(`http://localhost:5000/vouchers/${voucherId}`, {
            method: "GET",
        });
        response = await response.json();

        if (response.code == CODIGO_HTTP.OK) {
            setVoucher(response.voucher);
        } else {
            return history.push("/NotFound")
        }
        
        if (response.voucher.miembro)
            setId_miembro(response.voucher.miembro.id)
        else
            setId_miembro(null)

        if (response.voucher.producto)
            setId_producto(response.voucher.producto.id)
        else
            setId_producto(null)
        setLoading(false)
    }

    const loadVoucherUser = async (id_miembro) => {
        let response = await fetch(`http://localhost:5000/vouchers/${voucherId}`, {
            method: "GET",
        });
        response = await response.json();

        if (response.code == CODIGO_HTTP.OK) {
            setVoucher(response.voucher);
        } else {
            return history.push("/NotFound")
        }

        if (response.voucher.miembro)
            if (response.voucher.miembro.id != id_miembro) {
                history.push("/NotFound")
            } else
                setId_miembro(response.voucher.miembro.id)
        else
            setId_miembro(null)

        if (response.voucher.producto)
            setId_producto(response.voucher.producto.id)
        else
            setId_producto(null)
        setLoading(false)
    }

    const { id, fecha_de_creacion, estado, fecha_de_vencimiento } = voucher;

    const onCancel = () => {
        return history.push('/vouchers')
    }

    return (
        <div> { (!loading) ?
            <div className="container fluid">
                <Form id="formEditTransaction">
                    <FormGroup>
                        <Label for="voucherId">ID</Label>
                        <Input type="text" id="voucherId" name="id" placeholder="Id de voucher" value={id} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="voucherMember">Miembro</Label>
                        <Input type="integer" id="voucherMember" name="id_miembro" placeholder="Id de Miembro del voucher" value={id_miembro} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="voucherProduct">Producto</Label>
                        <Input type="integer" id="voucherProduct" name="id_producto" placeholder="Id de Miembro del voucher" value={id_producto} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="voucherRegistrationDate">Fecha de creación</Label>
                        <Input type="date" id="voucherRegistrationDate" name="fecha_de_creacion" placeholder="Fecha de creación del voucher" value={fecha_de_creacion} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="voucherState">Estado</Label>
                        <Input type="text" id="voucherState" name="estado" placeholder="Estado del voucher" value={estado} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label for="voucherExpirationDate">Fecha de vencimiento</Label>
                        <Input type="date" id="voucherExpirationDate" name="fecha_de_vencimiento" placeholder="Fecha de vencmiento del voucher" value={fecha_de_vencimiento} readOnly />
                    </FormGroup>
                </Form>
                <Button color="primary" onClick={onCancel}>Cancelar</Button>
            </div> : <div className="spinner-center"><Spinner color="primary" /></div>}
        </div>
    );
};

export default EditVoucher;