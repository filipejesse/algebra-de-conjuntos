import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import 'bulma';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home>
        </Home>
      </div>
    );
  }
}

export default App;
