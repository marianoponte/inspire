import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Spinner } from 'reactstrap';
import VouchersTable from './VouchersTable';
import jwt_decode from 'jwt-decode';

const VouchersTab = () => {

    let history = useHistory();

    const [vouchers, setVouchers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [vouchersOriginal, setVouchersOriginal] = useState([]);
    
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else {
            var token = localStorage.getItem('token')
            var memberLogged = jwt_decode(token);
            if (memberLogged.permiso == "Admin") {
                getVouchersAdmin();
            } else {
                getVouchersUser(memberLogged.id);
            }
        }
    }, []);

    const getVouchersAdmin = async () => {
        let response = await fetch('http://localhost:5000/vouchers', {
            method: "GET"
        });
        response = await response.json();
        setVouchers(response.vouchers);
        setVouchersOriginal(response.vouchers);
        setLoading(false);
    }

    const getVouchersUser = async (id_member) => {
        let response = await fetch(`http://localhost:5000/vouchers?id_miembro=${id_member}`, {
            method: "GET"
        });
        response = await response.json();
        setVouchers(response.vouchers);
        setVouchersOriginal(response.vouchers);
        setLoading(false);
    }

    const onInputChange = async e => {
        await setSearch(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        SearchVouchers()
    }

    const SearchVouchers = () => {
        var vouchers = vouchersOriginal
        var filteredVouchers = vouchers.filter(voucher => {
            if (voucher.id.toString().includes(search))
            return voucher;
        })
        setVouchers(filteredVouchers);
    }

    return (
        <div>
            <div className="buttons-line d-flex justify-content-between align-items-center">
                <form className="form-inline my-2 my-lg-0 form-search" onSubmit={handleSubmit}>
                    <input className="form-control mr-sm-1" id="input-search-voucher" type="text" placeholder="Id de voucher..." name="search" value={search} onChange={onInputChange} />
                    <button className="btn btn-secondary my-2 my-sm-0" id="btn-search-voucher" type="submit">Buscar</button>
                </form>
            </div>
            {(!loading) ?
                <VouchersTable
                    vouchers={vouchers} /> : <div className="spinner-center"><Spinner color="primary" /></div>}
        </div>
    );
};

export default VouchersTab;