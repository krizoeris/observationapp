import React, { useState } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import AppContext from './AppContext';
import './App.css';

import Navigation from './components/Navigation';
import Home from './Home';

// Admin Permission
import Users from './Admin/Users';
import Subjects from './Admin/Subjects';
import Grades from './Admin/Grades';
import Forms from './Admin/Forms';


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
          <Route path="/admin/forms" component={Forms} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
