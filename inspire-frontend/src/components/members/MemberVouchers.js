import React, { useState, useEffect } from 'react';
import VouchersTable from '../vouchers/VouchersTable';

const MemberVouchers = (props) => {

    const { id } = props

    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        loadVouchers(id)
    },[]);

    const loadVouchers = async (id) => {
        let response = await fetch(`http://localhost:5000/vouchers?id_miembro=${id}`, {
            method: "GET"
          });
          response = await response.json();

          setVouchers(response.vouchers);
    }
    
    return (
        <div>
            <VouchersTable vouchers={vouchers} />
        </div>
    );
};

export default MemberVouchers;