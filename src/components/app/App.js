// Dependecies
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

// Local 
import AppContext from '../../AppContext';
import './App.css';

// Shared
import Navigation from '../../shared/components/Navigation';

// Admin Pages
import Home from '../admin/Home';
import Users from '../admin/users/Users';
import Subjects from '../admin/subjects/Subjects';
import Grades from '../admin/grades/Grades';
import Forms from '../admin/forms/Forms';
import CustomForm from '../admin/forms/CustomForm';

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

          <Route path="/admin/users" component={Users} />
          <Route path="/admin/subjects" component={Subjects} />
          <Route path="/admin/grades" component={Grades} />
          <Route exact path="/admin/forms" component={Forms} />
          <Route path="/admin/forms/:id" component={CustomForm} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
