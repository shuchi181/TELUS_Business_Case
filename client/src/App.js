import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import store from './store';

import Dashboard from './components/Dashboard';
import NewForm from './components/form-components/NewForm';
import EditForm from './components/form-components/EditForm';
import PublishedForm from './components/form-components/PublishedForm';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/new-form" component={NewForm} />
            <Route exact path="/edit-form/:formId" component={EditForm} />
            <Route exact path="/published-form/:formId" component={PublishedForm} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
