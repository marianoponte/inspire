import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Spinner } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import classnames from 'classnames';
import MemberTransactions from './MemberTransactions';
import swal from 'sweetalert';
import CODIGO_HTTP from '../../utils/Utils'
import MemberTrades from './MemberTrades';
import MemberVouchers from './MemberVouchers';
import jwt_decode from 'jwt-decode';

const EditMember = () => {

    let history = useHistory();

    const { memberId } = useParams();

    const [member, setMember] = useState({});

    const [activeTab, setActiveTab] = useState('1');

    const [loading, setLoading] = useState(true)

    const [emailOriginalMember, setEmailOriginalMember] = useState("")

    const cleanForm = () => {
        setMember({})
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else {
                var token = localStorage.getItem('token')
                var memberLogged = jwt_decode(token);
                if (memberLogged.permiso == "Admin") {
                    loadMember();
                } else {
                    history.push("/NotFound")
                }
        }
    }, []);

    const loadMember = async () => {
        let response = await fetch(`http://localhost:5000/members/${memberId}`, {
            method: "GET",
        });
        response = await response.json();
        console.log("Response del Get Member: ", response.miembro)
        setMember(response.miembro);
        setEmailOriginalMember(response.miembro.email)
        setLoading(false)
    }

    const { nombre, apellido, email, puntos, fecha_de_nacimiento, fecha_de_registro, estado, comentario } = member;

    const onInputChange = e => {
        setMember({ ...member, [e.target.name]: e.target.value })
    };

    const toggleTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const onSave = async () => {
            console.log(JSON.stringify(member))
            let response = await fetch(`http://localhost:5000/members/${member.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(member)
            })

            console.log(JSON.stringify(member))
            response = await response.json();
            console.log(response)

            if (response.code == CODIGO_HTTP.OK) {
                swal("Bien!", "Cambios guardados correctamente", "success")
                var token = localStorage.getItem('token')
                var memberToken = jwt_decode(token);
                if (memberId === memberToken.id) {
                    localStorage.setItem('token', response.token)
                }
            } else {
                swal("Error", "No se pudieron guardar los cambios", "error")
            }
        }

    return (
        <Row>
            <Col xs="6" sm="4" md="3">
                <Nav tabs vertical pills>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => {
                                toggleTab('1');
                            }}
                        >
                            Información
              </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => {
                                toggleTab('2');
                            }}
                        >
                            Transacciones
              </NavLink>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => {
                                toggleTab('3');
                            }}
                        >
                            Canjes
              </NavLink>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => {
                                toggleTab('4');
                            }}
                        >
                            Vouchers
              </NavLink>
                    </NavItem>
                </Nav>
            </Col>
            <Col xs="6" sm="6" md="6">
                <TabContent activeTab={activeTab}>
                    {(!loading) ?
                        <TabPane tabId="1">
                            <Form id="formEditMember">
                                <FormGroup>
                                    <Label for="memberName">Nombre</Label>
                                    <Input type="text" id="memberName" name="nombre" placeholder="Nombre de cliente" value={nombre} onChange={e => onInputChange(e)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="memberLastName">Appellido</Label>
                                    <Input type="text" id="memberLastName" name="apellido" placeholder="Apellido de cliente" value={apellido} onChange={e => onInputChange(e)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="memberEmail">Email</Label>
                                    <Input type="text" id="memberEmail" name="email" placeholder="Email de cliente" value={email} onChange={e => onInputChange(e)} readOnly/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="memberPoints">Puntos</Label>
                                    <Input type="number" id="memberPoints" name="puntos" placeholder="Puntos del cliente" value={puntos} readOnly />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="memberBirthDate">Fecha de nacimiento</Label>
                                    <Input type="date" id="memberBirthDate" name="fecha_de_nacimiento" placeholder="Fecha de nacimiento de cliente" value={fecha_de_nacimiento} onChange={e => onInputChange(e)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="memberRegistrationDate">Fecha de registro</Label>
                                    <Input type="date" id="memberRegistrationDate" name="fecha_de_registro" placeholder="Fecha de registro de cliente" value={fecha_de_registro} readOnly />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="memberState">Estado</Label>
                                    <Input type="select" id="memberState" name="estado" placeholder="Estado de cliente" value={estado} onChange={e => onInputChange(e)}>
                                        <option>Activo</option>
                                        <option>Inactivo</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="memberComment">Comentario</Label>
                                    <Input type="text" id="memberComment" name="comentario" placeholder="Comentario de cliente" value={comentario} onChange={e => onInputChange(e)} />
                                </FormGroup>
                            </Form>
                            <Button color="primary" onClick={onSave}>Guardar</Button>
                        </TabPane> : <div className="spinner-center"><Spinner color="primary" /></div>}
                    <TabPane tabId="2">
                        <MemberTransactions id={memberId} />
                    </TabPane>
                    <TabPane tabId="3">
                        <MemberTrades id={memberId} />
                    </TabPane>
                    <TabPane tabId="4">
                        <MemberVouchers id={memberId} />
                    </TabPane>
                </TabContent>
            </Col>
        </Row>
    );
};

export default EditMember;