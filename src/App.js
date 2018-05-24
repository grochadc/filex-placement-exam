import React, { Component } from 'react';
import PersonalInfo from './components/PersonalInfo';
import Test from './components/Test';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { section: 'info'};
    this.handleInfo = this.handleInfo.bind(this);
  }
  handleInfo(info){
    this.setState({
      section: 'test',
      contact: info
    });
  }
  render() {
    return (
      <div>
      <h1>FILEX Placement Exam</h1>
      { this.state.section === 'test' ?
        <Test /> :
        this.state.section === 'info' ?
          <PersonalInfo sendInfo={this.handleInfo}/> :
          null
      }
      </div>
    );
  }
}

export default App;
