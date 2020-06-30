import React from 'react';
import Home from './Home';
import About from './About';
import CV from  './CV';
import Projects from './Projects';
import Contact from './Contact';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/Projects' component={Projects}></Route>
          <Route exact path='/CV' component={CV}></Route>
          <Route exact path='/About' component={About}></Route>
          <Route exact path='/Contact' component={Contact}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
