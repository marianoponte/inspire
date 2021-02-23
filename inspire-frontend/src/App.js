import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import NavbarMain from './components/layouts/NavbarMain';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MembersTable from './components/members/MembersTable';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import EditMember from './components/members/EditMember';
import AddMember from './components/members/AddMember';
import Login from './components/pages/Login';
import TransactionsTab from './components/transactions/TransactionsTab';
import EditTransaction from './components/transactions/EditTransaction';
import ProductsTable from './components/products/ProductsTable';
import VouchersTab from './components/vouchers/VouchersTab';
import EditVoucher from './components/vouchers/EditVoucher';

function App() {

  return (
    <div className="App">
      <Router>
        <NavbarMain /> 
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/members" component={MembersTable} />
          <Route exact path="/vouchers" component={VouchersTab} />
          <Route exact path="/vouchers/:voucherId" component={EditVoucher}/>
          <Route exact path="/transactions" component={TransactionsTab}/>
          <Route exact path="/transactions/:txtId" component={EditTransaction}/>
          <Route exact path="/products" component={ProductsTable}/>
          <Route exact path="/members/add" component={AddMember} />
          <Route exact path="/members/:memberId" component={EditMember} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;