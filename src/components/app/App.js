// Dependecies
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

// Local 
import AppContext from '../../AppContext';
import './App.css';

// Shared
import Navigation from '../../shared/components/Navigation';

// User
import Login from '../user/Login';
import Home from '../user/Home';
import Observations from '../user/observations/Observations';
import Reports from '../user/reports/Reports';

// Admin Pages
import AdminHome from '../admin/Home';
import AdminLogin from '../admin/Login';
import AdminUsers from '../admin/users/Users';
import AdminSubjects from '../admin/subjects/Subjects';
import AdminGrades from '../admin/grades/Grades';
import AdminForms from '../admin/forms/Forms';
import AdminCustomForm from '../admin/forms/CustomForm';

function App() {
  // GlobalState
  const [globalState, setGlobalState] = useState({
    user: JSON.parse(sessionStorage.getItem('userAccess'))
  })

  // Admin Routes
  const AdminRoute = ({component: Component, ...restOfProps}) => {
    return(
      <div>
        <Navigation type="admin" />
        <Route {...restOfProps} 
          render={
            props => (sessionStorage.getItem('isAdmin') && sessionStorage.getItem('token')) ?
            (<Component {...props} {...restOfProps} />) :
            (<Redirect to={
              {pathname: '/admin/login'}
            } />)
          }
        />
      </div>
    )
  }

  // Admin Login Routes
  const AdminLoginRoute = ({component: Component, ...restOfProps}) => {
    return(
      <div>
        <Navigation />
        <Route {...restOfProps} 
          render={
            () => (sessionStorage.getItem('isAdmin') && sessionStorage.getItem('token')) ?
            (<Redirect to={
              {pathname: '/admin/'}
            } />) :
            (<Component {...restOfProps} />) 
          }
        />
      </div>
    )
  }

  // User Login Routes
  const UserLoginRoute = ({component: Component, ...restOfProps}) => {
    return(
      <div>
        <Navigation />
        <Route {...restOfProps} 
          render={
            () => sessionStorage.getItem('token') ?
            (<Redirect to={
              {pathname: '/'}
            } />) :
            (<Component {...restOfProps} />) 
          }
        />
      </div>
    )
  }
  
  return (
    <AppContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path="/observations" component={Observations} />
          <Route path="/reports" component={Reports} />

          <AdminLoginRoute path="/admin/login" component={AdminLogin} />
          <AdminRoute exact path="/admin/" component={AdminHome} />
          <AdminRoute path="/admin/users" component={AdminUsers} />
          <AdminRoute path="/admin/subjects" component={AdminSubjects} />
          <AdminRoute path="/admin/grades" component={AdminGrades} />
          <AdminRoute exact path="/admin/forms" component={AdminForms} />
          <AdminRoute path="/admin/forms/:id" component={AdminCustomForm} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
