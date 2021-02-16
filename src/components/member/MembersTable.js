import React, { useState, useEffect } from 'react';
import {Button, Table} from 'reactstrap'
import {Link} from "react-router-dom";
import AddMember from './AddMember';
import SearchMember from './SearchMember';

const MembersTable = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {
        /* Llamado a la API para hacer el GET de los members */
        /* const result = await axios.get(url); */
        const result = [{ id: 1, name: 'Alex', lastname: 'Rodriguez', points: '43', registrationDate: '24/01/2020'},
                        { id: 2, name: 'Mario', lastname: 'Liok', points: '13', registrationDate: '05/11/2019'} ]
        
        setMembers(result);
    }

    return (
        <div>
            <div className="buttons-line d-flex justify-content-between align-items-center">
           <SearchMember />
           <AddMember />
           </div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Puntos</th>
                        <th>Fecha de Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.lastname}</td>
                            <td>{member.points}</td>
                            <td>{member.registrationDate}</td>
                            <td>
                                <Link className="btn btn-primary" id="btnEdit" exact to={`/members/edit/${member.id}`}>Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MembersTable;