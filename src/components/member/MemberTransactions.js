import React, {useEffect} from 'react';
import { Table } from 'reactstrap'

const MemberTransactions = (props) => {

    /* useEffect(() =>
        alert(props.id), []) */

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Fecha de transacción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mariano Ponte</td>
                        <td>Cerveza</td>
                        <td>11/02/2021</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default MemberTransactions;