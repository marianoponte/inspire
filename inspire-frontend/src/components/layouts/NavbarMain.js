import React from 'react';
import { Link } from 'react-router-dom';
import LogOut from '../pages/LogOut';

const NavbarMain = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" id="navigation-bar">
            <Link className="navbar-brand" exact to="/home">Inspire</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" exact to="/home">Home</Link>
                    </li>
                    <li className="nav-item" id="member-navbar">
                        <Link className="nav-link" exact to="/members">Miembros</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" exact to="/vouchers">Vouchers</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" exact to="/transactions">Transacciones</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" exact to="/products">Productos</Link>
                    </li>
                </ul>
                <LogOut />
            </div>
        </nav>);
};

export default NavbarMain;