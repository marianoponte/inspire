import React from 'react';
import { Table } from 'reactstrap'
import { Link } from "react-router-dom";

const VouchersTable = (props) => {

    const { vouchers } = props
    
    return (
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Miembro</th>
                    <th>Id Miembro</th>
                    <th>Producto</th>
                    <th>Id Producto</th>
                    <th>Fecha de creación</th>
                    <th>Fecha de vencimiento</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {vouchers.map((voucher) => (
                    <tr>
                        <td>{voucher.id}</td>
                        <td>{voucher.miembro ? `${voucher.miembro.nombre} ${voucher.miembro.apellido}` : null}</td>
                        <td>{voucher.miembro ? voucher.miembro.id : null}</td>
                        <td>{voucher.producto ? voucher.producto.nombre : null}</td>
                        <td>{voucher.producto ? voucher.producto.id : null}</td>
                        <td>{voucher.fecha_de_creacion}</td>
                        <td>{voucher.fecha_de_vencimiento}</td>
                        <td>{voucher.estado}</td>
                        <td>
                            <Link className="btn btn-primary" id="btnEditVoucher" exact to={`/vouchers/${voucher.id}`}>Ver</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default VouchersTable;