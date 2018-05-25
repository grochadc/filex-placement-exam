import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import PersonalInfo from './components/PersonalInfo';
import FinishedMessage from './components/FinishedMessage';
import Test from './components/Test';

const ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      section: 'info',
      testSection: 0,
      results: new Array(7),
      finished: false,
      testID: ID()
    };
    this.handleInfo = this.handleInfo.bind(this);
    this.handleResults = this.handleResults.bind(this);
  }
  handleInfo(info){
    let newState = update(this.state, {
      section: {$set: 'test'},
      contact: {$set: info}
    });
    this.setState(newState);
  }

  handleResults(res){
    let newState = update(this.state, {
      results: {[res.section]: {$set: res.correctAnswers}},
      testSection: {$apply: (section) => section+1},
      finished: {$set: res.finished}
    });
    this.setState(newState);

    if(res.finished){
      let { testID } = this.state;
      let store = 'https://www.jsonstore.io/65d8d594a3236f5b7fb12743bd0f3854f6f2c304dd6accae5485eb9a3b9579f3/tests/'+testID;
      axios({
        method: 'post',
        url: store,
        data: {
          contact: this.state.contact,
          results: this.state.results
        }
      });
    }
  }
  render() {
    return (
      <div>
      <h1>FILEX Placement Exam</h1>
      { this.state.section === 'test' ?
          this.state.finished ?
            <FinishedMessage testID={this.state.testID}/> :
            <Test section={this.state.testSection} sendResults={this.handleResults} /> :
              this.state.section === 'info' ?
                <PersonalInfo sendInfo={this.handleInfo} /> :
                'Incorrect section name'
      }
      </div>
    );
  }
}

export default App;
