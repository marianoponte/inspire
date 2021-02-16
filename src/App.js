import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarMain from './components/layouts/NavbarMain';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MembersTable from './components/member/MembersTable';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import EditMember from './components/member/EditMember';
import AddMember from './components/member/AddMember';
import Login from './components/pages/Login';

function App() {

  const [isNavbarHidden, setIsNavbarHidden] = useState(false); 

  return (
    <div className="App">
      <Router>
      { (isNavbarHidden) ? null : <NavbarMain /> }
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/members" component={MembersTable} />
          <Route exact path="/transactions" />
          <Route exact path="/products" />
          <Route exact path="/members/add" component={AddMember} />
          <Route exact path="/members/edit/:id" component={EditMember} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;