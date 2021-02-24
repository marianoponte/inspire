import React from 'react';
import { Button } from 'reactstrap';
import swal from 'sweetalert';
import jwt_decode from 'jwt-decode';
import CODIGO_HTTP from '../../utils/Utils'
import HOST from '../../utils/Host';

const Canje = (props) => {

    const { productId, puntos } = props

    const trade = async () => {
        var token = localStorage.getItem('token')
        var decoded = jwt_decode(token);

        getMember(decoded.email).then(r => {
        console.log(r)
        if (checkPoints(r.puntos)) {
            generateTradeTransaction(r.id).then(trx => {
                updateMemberPoints(r)
                generateMemberVoucher(r).then(voucher => { 
                    console.log(voucher)
                    swal("¡El canje se ha realizado con éxito!", `Se generó el voucher con número: ${voucher.id} \n Se restaron: ${puntos} puntos`, "success") }
            )})
        } else {
            swal("Error", "No tiene los puntos suficientes para poder canjear", "error")
        }
        });
    }

    const getMember = async (email) => {
        console.log(email)
        let response = await fetch(`http://${HOST}:5000/members?email=${email}`, {
            method: "GET"
          });
            response = await response.json();
            console.log(response)
            if (response.code == CODIGO_HTTP.OK) {
                console.log("Miembro filtrado: ", response.miembros[0])
                return response.miembros[0]
            } else {
                swal("Error", response.mensaje, "error")
            }
    }

    const checkPoints = (puntosMiembro) => {
        console.log(puntosMiembro)
        console.log(puntos)
        if (puntosMiembro > 0 && puntosMiembro >= puntos) {
            return true
        } else {
            return false
        }
    }

    const generateTradeTransaction = async (id_miembro) => {
        var payload = {
            id_miembro,
            puntos,
            tipo: "Canje",
            descripcion: "Transacción generada automaticamente por canje de producto",
            monto: 0,
            id_producto: productId
        }
        
        console.log(payload)
        let response = await fetch(`http://${HOST}:5000/transactions`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)})

        console.log(JSON.stringify(payload))
        console.log(response)
    }

    const updateMemberPoints = async (member) => {
        var puntosParaActualizar = member.puntos - puntos
        console.log("Puntos para actualizar: ", puntosParaActualizar)
        var payload = {
            nombre: member.nombre,
            apellido: member.apellido,
            email: member.email,
            fecha_de_nacimiento: member.fecha_de_nacimiento,
            estado: member.estado,
            comentario: member.comentario,
            puntos: puntosParaActualizar
        }
        console.log(payload)
        let response = await fetch(`http://${HOST}:5000/members/${member.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)})

        console.log(JSON.stringify(payload))
        console.log(JSON.stringify(response))
    }

    const generateMemberVoucher = async (member) => {
        var payload = {
            id_producto: productId,
            id_miembro: member.id 
        }
        console.log("Member de voucher", member)
        console.log("Payload de Crear Voucher: ", payload)

        let response = await fetch(`http://${HOST}:5000/vouchers`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)})
        response = await response.json();

        if (response.code == CODIGO_HTTP.CREATED) {
            return response.voucher
        } else {
            swal("Error", response.mensaje, "error")
        }
    }

    const toggle = () => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez canjeado, no se podrán devolver los puntos",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willTrade) => {
            if (willTrade) {
                trade()
            }
          });
    }

    return (
        <div>
            <Button className="btn btn-primary btn-block" color="btn-primary" onClick={toggle}>Canjear</Button>
        </div>
    );
};

export default Canje;