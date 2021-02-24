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
                    <th>Id Miembro</th>
                    <th>Miembro</th>
                    <th>Id Producto</th>
                    <th>Producto</th>
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
                        <td>{transaction.miembro ? `${transaction.miembro.nombre} ${transaction.miembro.apellido}` : null}</td>
                        { transaction.producto ? <td>{transaction.producto.id}</td> : <td></td>}
                        <td>{transaction.producto ? `${transaction.producto.nombre}` : null}</td>
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