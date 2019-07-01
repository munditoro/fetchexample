import React, { Component } from 'react';
import 'whatwg-fetch';
import TimeForm from './TimeForm';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.fetchCurrentTime = this.fetchCurrentTime.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this); 

    this.state = {
      currentTime: null,
      msg: 'now',
      tz: 'PST'
    }
  }

  fetchCurrentTime(){
    fetch(this.getApiUrl())
        .then(resp => resp.json())
        .then(resp =>{
            const currentTime = resp.dateString;
            this.setState({currentTime});
        })
  }

  getApiUrl(){
    const {tz, msg} = this.state;
    const host = 'https://andthetimeis.com';
    return host + '/' +tz + '/' + msg + '.json';
  }

  handleFormSubmit(evt){
    this.fetchCurrentTime();
  }

  handleChange(newState){
    this.setState({newState});
  }

  render(){
    const {currentTime, tz} = this.state;
    const apiUrl = this.getApiUrl();
    return (
      <div>
        {!currentTime &&
          <button onClick={this.fetchCurrentTime}>
              Obtener la hora actual
          </button>
        }
        {currentTime && <div>La hora actual es: {currentTime}</div> }
        <TimeForm 
            onFormSubmit={this.handleFormSubmit}
            onFormChange={this.handleChange}
            tz={tz}
            msg={'now'}
        />
        <p>Haremos una petición hacia: <code>{apiUrl}</code></p>
      </div>
    );
  }
}

export default App;
