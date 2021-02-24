import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AddTransaction from './AddTransaction';
import TransactionsTable from './TransactionsTable';
import jwt_decode from 'jwt-decode';
import { Spinner } from 'reactstrap';
import HOST from '../../utils/Host'

const TransactionsTab = () => {

    let history = useHistory();

    const [transactions, setTransactions] = useState([]);

    const [transactionsOriginal, setTransactionsOriginal] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isAdmin, setIsAdmin] = useState(false)

    const [search, setSearch] = useState('')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return history.push('/login');
        } else {
            var token = localStorage.getItem('token')
            var memberLogged = jwt_decode(token);
            if (memberLogged.permiso == "Admin") {
                getTransactionsAdmin();
                setIsAdmin(true)
            } else {
                getTransactionsUser(memberLogged.id);
            }
        }
    }, []);

    const getTransactionsAdmin = async () => {
        let response = await fetch(`http://${HOST}:5000/transactions`, {
            method: "GET"
        });
        response = await response.json();
        setTransactions(response.transacciones);
        setTransactionsOriginal(response.transacciones);
        setLoading(false);
    }

    const getTransactionsUser= async (id_member) => {
        let response = await fetch(`http://${HOST}:5000/transactions?id_miembro=${id_member}`, {
            method: "GET"
        });

        response = await response.json();
        setTransactions(response.transacciones);
        setTransactionsOriginal(response.transacciones);
        setLoading(false);
    }

    const onInputChange = async e => {
        await setSearch(e.target.value)
        console.log(search)
    }

    const handleSubmit = e => {
        e.preventDefault()
        SearchTransactions()
    }

    const SearchTransactions = () => {
        var transactions = transactionsOriginal
        var filteredTransactions = transactions.filter(transaction => {
            if (transaction.id.toString().includes(search))
            return transaction;
        })
        setTransactions(filteredTransactions);
    }

    return (
        <div>
            <div className="buttons-line d-flex justify-content-between align-items-center">
            <form className="form-inline my-2 my-lg-0 form-search" onSubmit={handleSubmit}>
                            <input className="form-control mr-sm-1" id="input-search-transaction" type="text" placeholder="Id de transacción..." name="search" value={search} onChange={onInputChange} />
                            <button className="btn btn-secondary my-2 my-sm-0" id="btn-search-transaction" type="submit">Buscar</button>
                        </form>
                { isAdmin ? <AddTransaction /> : null}
                </div>
            {(!loading) ?
                <div>
                    <TransactionsTable
                        transactions={transactions} />
                </div> : <div className="spinner-center"><Spinner color="primary" /></div>}
        </div>
    );
};

export default TransactionsTab;