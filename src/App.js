import React, { Component } from 'react';
import PersonalInfo from './components/PersonalInfo';
import Test from './components/Test';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { test: false};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({test: true});
  }
  render() {
    return (
      this.state.test ?
        <Test /> :
        <div><PersonalInfo /><br /><button onClick={() => this.handleClick()}> Show test </button></div>
    );
  }
}

export default App;
