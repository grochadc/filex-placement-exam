import React, { Component } from 'react';
import PersonalInfo from './components/PersonalInfo';
import Test from './components/Test';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { test: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
  }
  handleClick(){
    this.setState({test: true});
  }
  handleInfo(info){
    this.setState({
      test: true,
      contact: info
    });
  }
  render() {
    return (
      this.state.test ?
        <Test /> :
        <PersonalInfo sendInfo={this.handleInfo}/>
    );
  }
}

export default App;
