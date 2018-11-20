import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import Bandit from './Bandit'

class App extends Component {
  render() {

    var names = ["ana.png", "cha.png", "franck.png", "gee.png", "gui.png", "raph.png"];
    var icons = []
    for(var i=0;i<3;i++){
      icons.push(names)
    }

    return (
      <div className="App">
        <header className="App-header">
        </header>
        <main className="App-main">

          <div style={ {margin : 'auto auto'}}>
            <Bandit icons={icons} ></Bandit>
          </div>
          

        </main>
        <footer className="App-footer">
          Un autre produit de marque EZ

        </footer>
      </div>
    );
  }
}

export default App;
