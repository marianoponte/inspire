import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Spinner } from 'reactstrap';
import VouchersTable from './VouchersTable';

const VouchersTab = () => {

    let history = useHistory();

    const [vouchers, setVouchers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else getVouchers()
    }, []);

    const getVouchers = async () => {
        let response = await fetch('http://localhost:5000/vouchers', {
            method: "GET"
        });
        response = await response.json();
        console.log("Response: ", response);
        setVouchers(response.vouchers);
        setLoading(false)
    }

    return (
        <div> { (!loading) ?
            <VouchersTable
                vouchers={vouchers} /> : <div className="spinner-center"><Spinner color="primary" /></div>}
        </div>
    );
};

export default VouchersTab;