import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import classnames from 'classnames';
import MemberTransactions from './MemberTransactions';

const EditMember = () => {

    let history = useHistory();

    const { id } = useParams();

    const [member, setMember] = useState({
        name: "",
        lastname: "",
        email: "",
        points: "",
        registrationDate: ""
    });

    const [activeTab, setActiveTab] = useState('1');

    const cleanForm = () => {
        setMember({
            name: "",
            lastname: "",
            email: "",
            password: ""
        })
    }

    useEffect(() => {
        loadMember();
    }, []);

    const loadMember = async () => {
        /* Llamado a la API para hacer el GET de los member */
        /* const result = await axios.get(url); */
        console.log(id);

        const result = { id: 1, name: 'Alex', lastname: 'Rodriguez', points: '43', registrationDate: '24/01/2020' };

        setMember(result);
    }
    const { name, lastname, email, points, registrationDate } = member;

    const onInputChange = e => {
        setMember({ ...member, [e.target.name]: e.target.value })
    };

    const toggleTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const onSave = () => {
        /* Llamado a la API para hacer el PUT de los nuevos datos para el member */
        //alert("guardado de datos!")
        history.push("/members")
    }   

    /*return(
        <div>
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
            </div>
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
                <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
                <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>
        </div>
    ); */

    
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
                    </NavItem>
                </Nav>
            </Col>
            <Col xs="6" sm="6" md="6">
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Form id="formEditMember">
                            <FormGroup>
                                <Label for="memberName">Nombre</Label>
                                <Input type="text" id="memberName" name="name" placeholder="Nombre de cliente" value={name} onChange={e => onInputChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="memberLastName">Appellido</Label>
                                <Input type="text" id="memberLastName" name="lastname" placeholder="Apellido de cliente" value={lastname} onChange={e => onInputChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="memberEmail">Email</Label>
                                <Input type="text" id="memberEmail" name="email" placeholder="Email de cliente" value={email} onChange={e => onInputChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="memberPoints">Puntos</Label>
                                <Input type="number" id="memberPoints" name="points" placeholder="Puntos del cliente" value={points} onChange={e => onInputChange(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="memberRegistrationDate">Fecha de registro</Label>
                                <Input type="text" id="memberRegistrationDate" name="registrationDate" placeholder="Fecha de registro de cliente" value={registrationDate} onChange={e => onInputChange(e)} />
                            </FormGroup>
                        </Form>
                        <Button color="primary" onClick={onSave}>Guardar</Button>
                    </TabPane>
                    <TabPane tabId="2">
                        <MemberTransactions id={id} />
                    </TabPane>
                    <TabPane tabId="3">
                        <h4>Tab 3 Contents</h4>
                    </TabPane>
                </TabContent>
            </Col>
        </Row>
    ); 
};

export default EditMember;