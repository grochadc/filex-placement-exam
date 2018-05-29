import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import PersonalInfo from './components/PersonalInfo';
import FinishedMessage from './components/FinishedMessage';
import Test from './components/Test';
import ID from './lib/id';
import conditioned from './components/ConditionedComponent';

const PersonalInfoWithCondition = (props) => conditioned(PersonalInfo, props);
const TestWithCondition = (props) => conditioned(Test, props);
const FinishedMessageWithCondition = (props) => conditioned(FinishedMessage, props);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      section: 'info',
      testSection: 0,
      results: [],
      finished: false,
      testID: ID()
    };
    this.handleInfo = this.handleInfo.bind(this);
    this.handleResults = this.handleResults.bind(this);
    this.handleResultPosting = this.handleResults.bind(this);
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
      results: {$push: [res.correctAnswers]},
      testSection: {$apply: (section) => section+1},
      finished: {$set: res.finished}
    });
    this.setState(newState);
  }

  componentDidUpdate(){
    if(this.state.finished){
      let { testID } = this.state;
      let store = 'https://www.jsonstore.io/65d8d594a3236f5b7fb12743bd0f3854f6f2c304dd6accae5485eb9a3b9579f3/tests/'+testID;
      axios({
        method: 'post',
        url: store,
        data: {
          contact: this.state.contact,
          results: [this.state.results]
        }
      });
    }
  }
  render() {
    return (
      <div>
      <h1>FILEX Placement Exam</h1>
      <PersonalInfoWithCondition
        condition={this.state.section === 'info'}
        sendInfo={this.handleInfo}
        />
      <TestWithCondition
        condition={this.state.section === 'test' && !this.state.finished}
        section={this.state.testSection}
        sendResults={this.handleResults}
        />
      <FinishedMessageWithCondition
        condition={this.state.section === 'test' && this.state.finished }
        testID={this.state.testID}
        />
      </div>
    );
  }
}

export default App;
