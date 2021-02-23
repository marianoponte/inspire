import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AddTransaction from './AddTransaction';
import SearchTransaction from './SearchTransaction';
import TransactionsTable from './TransactionsTable';
import { Spinner } from 'reactstrap';

const TransactionsTab = () => {

    let history = useHistory();

    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else getTransactions()
    }, []);

    const getTransactions = async () => {
        let response = await fetch('http://localhost:5000/transactions', {
            method: "GET"
        });
        console.log("esperando el response")
        response = await response.json();
        setLoading(false)
        console.log("Response: ", response);
        setTransactions(response.transacciones);
    }

    return (
        <div>
            {(!loading) ?
                <div>
                    <div className="buttons-line d-flex justify-content-between align-items-center">
                        <SearchTransaction />
                        <AddTransaction />
                    </div>
                    <TransactionsTable
                        transactions={transactions} />
                </div> : <div className="spinner-center"><Spinner color="primary" /></div>}
        </div>
    );
};

export default TransactionsTab;