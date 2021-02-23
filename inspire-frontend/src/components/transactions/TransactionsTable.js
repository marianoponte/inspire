import React from 'react';
import { Table } from 'reactstrap'
import { Link } from "react-router-dom";

const TransactionsTable = (props) => {

    const { transactions } = props
    
    return (
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Tipo</th>
                    <th>Miembro</th>
                    <th>Puntos</th>
                    <th>Monto</th>
                    <th>Fecha de creación</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr>
                        <td>{transaction.id}</td>
                        <td>{transaction.tipo}</td>
                        { transaction.miembro ? <td>{transaction.miembro.id}</td> : <td></td>}
                        <td>{transaction.puntos}</td>
                        <td>{transaction.monto}</td>
                        <td>{transaction.fecha_creacion}</td>
                        <td>
                            <Link className="btn btn-primary" id="btnEditTransaction" exact to={`/transactions/${transaction.id}`}>Ver</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TransactionsTable;