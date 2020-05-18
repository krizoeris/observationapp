// Dependecies
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

// Local 
import AppContext from '../../AppContext';
import './App.css';

// Shared
import Navigation from '../../shared/components/Navigation';

// User
import Login from '../user/Login';

// Admin Pages
import Home from '../admin/Home';
import AdminLogin from '../admin/Login';
import AdminUsers from '../admin/users/Users';
import AdminSubjects from '../admin/subjects/Subjects';
import AdminGrades from '../admin/grades/Grades';
import AdminForms from '../admin/forms/Forms';
import AdminCustomForm from '../admin/forms/CustomForm';

function App() {
  // GlobalState
  const [globalState, setGlobalState] = useState({
    userType: 'Admin'
  })
  
  return (
    <AppContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/login" component={Login} />

          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/users" component={AdminUsers} />
          <Route path="/admin/subjects" component={AdminSubjects} />
          <Route path="/admin/grades" component={AdminGrades} />
          <Route exact path="/admin/forms" component={AdminForms} />
          <Route path="/admin/forms/:id" component={AdminCustomForm} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
