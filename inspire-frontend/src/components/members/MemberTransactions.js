import React, { useState, useEffect } from 'react';
import TransactionsTable from '../transactions/TransactionsTable';
import HOST from '../../utils/Host';

const MemberTransactions = (props) => {

    const { id } = props

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadTransactions(id)
    },[]);

    const loadTransactions = async (id) => {
        let response = await fetch(`http://${HOST}:5000/transactions?id_miembro=${id}`, {
            method: "GET"
          });
          response = await response.json();

          setTransactions(response.transacciones);
    }
    
    return (
        <div>
            <TransactionsTable transactions={transactions} />
        </div>
    );
};

export default MemberTransactions;