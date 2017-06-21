import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch'


class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      task: '',
      users: {},
      ready: false,
      username: '',
      newTask: ''
    }
  }


  componentDidMount() {
    setInterval(() => {
      fetch('/status')
      .then((response) => {
        return response.json()
      }).then((json) => {
        
        const userObj = json.users.reduce((acc, user) => {
          acc[user.name] = user.status;
          return acc;
        }, {})
        let ready = false
        if(this.state.username){
          ready = userObj[this.state.username] === 'Ready'
        }
        this.setState({users: userObj, ready: ready})
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    }, 1000)
  }

  changeReady(){
    fetch('/setStatus/' +this.state.username + '/' + (this.state.ready ? 'Not Ready': 'Ready'))
  }

  reset(){
    fetch('/reset/' + this.state.newTask)
  }

  render() {
    const { users, username, ready, newTask } = this.state
    const numReady = Object.values(users).filter(val => val === 'Ready').length
    const numUsers = Object.keys(users).length;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Hello, my name is...</h3>
          <input value={username} onChange={(e)=>this.setState({username: e.target.value})}/>
        </div>
        <p className="App-intro">
        <button onClick={this.changeReady.bind(this)}>{ready ? "Not Ready" : "Ready"}</button>
        <h1>Task  {numReady}/{numUsers}</h1>

        <h2>{this.state.task}</h2>
        <input value={newTask} onChange={(e)=>this.setState({newTask: e.target.value})}/>
        <button onClick={this.reset.bind(this)}> Reset </button>
        <div>
          {Object.keys(this.state.users).map(user => <div style={{color: users[user] === 'Ready' ? 'green' : 'red'}}>{user}: {users[user]} </div>)}
        </div>

        </p>
      </div>
    );
  }
}

export default App;
