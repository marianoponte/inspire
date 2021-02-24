import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import AddMember from './AddMember';
import swal from 'sweetalert';
import jwt_decode from 'jwt-decode';
import CODIGO_HTTP from '../../utils/Utils'
import HOST from '../../utils/Host';

const MembersTable = () => {

    let history = useHistory();

    const [members, setMembers] = useState([]);

    const [membersOriginal, setMembersOriginal] = useState([]);

    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')
    
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else {
            var token = localStorage.getItem('token')
            var memberLogged = jwt_decode(token);
            if (memberLogged.permiso == "Admin") {
                getMembers();
            } else {
                history.push("/NotFound")
            }
        }
    }, []);

    const getMembers = async () => {
        let response = await fetch(`http://${HOST}:5000/members`, {
            method: "GET"
        });

        response = await response.json();
        console.log("Response: ", response);
        setMembers(response.miembros);
        setMembersOriginal(response.miembros);
        setLoading(false);
    }

    const deleteMember = (memberId) => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no se podrá recuperar el miembro",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    let response = await fetch(`http://${HOST}:5000/members/${memberId}`, {
                        method: "DELETE"
                    })
                    response = await response.json()
                    if (response.code == CODIGO_HTTP.OK) {
                        swal("Bien!", response.mensaje, "success").then(() => {
                            window.location.reload();
                        })
                    } else {
                        swal("Error", response.mensaje, "error")
                    }
                }
            })
    }

    const onInputChange = async e => {
        await setSearch(e.target.value)
        console.log(search)
    }

    const handleSubmit = e => {
        e.preventDefault()
        searchMembers()
    }

    const searchMembers = () => {
        var members = membersOriginal
        var filteredMembers = members.filter(item => {
            if (item.nombre.toString().toLowerCase().includes(search.toLowerCase()) || item.apellido.toString().toLowerCase().includes(search.toLowerCase()))
            return item;
        })
        setMembers(filteredMembers);
    }
    
    return (
        <div>
            { (!loading) ?
                <div>
                    <div className="buttons-line d-flex justify-content-between align-items-center">
                        <form className="form-inline my-2 my-lg-0 form-search" onSubmit={handleSubmit}>
                            <input className="form-control mr-sm-1" id="input-search-member" type="text" placeholder="Nombre o apellido..." name="search" value={search} onChange={onInputChange} />
                            <button className="btn btn-secondary my-2 my-sm-0" id="btn-search-member" type="submit">Buscar</button>
                        </form>
                        <AddMember />
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Puntos</th>
                                <th>Fecha de Registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr>
                                    <td>{member.id}</td>
                                    <td>{member.nombre}</td>
                                    <td>{member.apellido}</td>
                                    <td>{member.email}</td>
                                    <td>{member.puntos}</td>
                                    <td>{member.fecha_de_registro}</td>
                                    <td>
                                        <Link className="btn btn-primary" id="btnEditMember" exact to={`/members/${member.id}`}>Ver</Link>
                                        <Button className="btn btn-danger" id="btnDeleteMember" onClick={() => deleteMember(member.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div> : <div className="spinner-center"><Spinner color="primary" /></div>
            }
        </div>
    );
}

export default MembersTable;