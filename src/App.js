import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage'
import StartPage from "./StartPage";

class App extends Component {

  state = {};

  render() {
    return (
        <StartPage/>
    );
  }
}

export default App;