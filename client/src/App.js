import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import store from './store';

import Dashboard from './components/Dashboard';
import EditForm from './components/form-components/EditForm';
import NewForm from './components/form-components/NewForm';
import PublishedForm from './components/form-components/PublishedForm';
import ResponseView from './components/form-components/ResponseView';
import TopBar from './components/layouts/TopBar';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <TopBar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/new-form" component={NewForm} />
            <Route exact path="/edit-form/:formId" component={EditForm} />
            <Route exact path="/published-form/:formId" component={PublishedForm} />
            <Route exact path="/view-responses/:formId" component={ResponseView} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
