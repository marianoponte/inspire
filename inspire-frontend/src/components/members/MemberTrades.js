import React, { useState, useEffect } from 'react';
import TransactionsTable from '../transactions/TransactionsTable';

const MemberTrades= (props) => {

    const { id } = props

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadTransactions(id)
    },[]);

    const loadTransactions = async (id) => {
        let tipo = "Canje"
        let response = await fetch(`http://localhost:5000/transactions?id_miembro=${id}&tipo=${tipo}`, {
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

export default MemberTrades;