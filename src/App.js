import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch'


class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      task: '',
      users: {}
    }
  }


  componentDidMount() {
    setInterval(() => {
      fetch('/status')
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState(json)
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
        <h1>Task</h1>
        <h2>{this.state.task}</h2>
        <div>
          {Object.keys(this.state.users).map(user => <div>{user}: {this.state.users[user]} </div>)}
        </div>

        </p>
      </div>
    );
  }
}

export default App;
