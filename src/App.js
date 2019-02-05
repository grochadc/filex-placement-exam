import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import PersonalInfo from "./components/PersonalInfo";
import FinishedMessage from "./components/FinishedMessage";
import Test from "./components/Test";
import ID from "./lib/id";
import conditioned from "./components/ConditionedComponent";
import { Title, Container } from "./components/Presentational";

const PersonalInfoWithCondition = props => conditioned(PersonalInfo, props);
const TestWithCondition = props => conditioned(Test, props);
const FinishedMessageWithCondition = props =>
  conditioned(FinishedMessage, props);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "info",
      testSection: 0,
      results: [],
      finished: false,
      testID: ID(),
      postingError: false,
      resultsPosted: false,
      postingErrorResolved: false
    };
    this.handleInfo = this.handleInfo.bind(this);
    this.handleResults = this.handleResults.bind(this);
    this.handleResultPosting = this.handleResults.bind(this);
    this.finishExam = this.finishExam.bind(this);
    this.postResults = this.postResults.bind(this);
  }
  handleInfo(info) {
    let newState = update(this.state, {
      section: { $set: "test" },
      contact: { $set: info }
    });
    this.setState(newState);
  }

  handleResults(res) {
    let newState = update(this.state, {
      results: { $push: [res.correctAnswers] },
      testSection: { $apply: section => section + 1 },
      finished: { $set: res.finished }
    });
    this.setState(newState);
  }

  postResults() {
    let { testID } = this.state;
    let store =
      "https://www.jsonstore.io/65d8d594a3236f5b7fb12743bd0f3854f6f2c304dd6accae5485eb9a3b9579f3/tests/" +
      testID;
    axios({
      method: "post",
      url: store,
      data: {
        contact: this.state.contact,
        results: [this.state.results]
      }
    })
      .then(() =>
        this.setState(
          update(this.state, {
            postingError: { $set: false },
            resultsPosted: { $set: true }
          })
        )
      )
      .catch(err => {
        if (!this.state.postingError) {
          this.setState(
            update(this.state, {
              postingError: { $set: true },
              resultsPosted: { $set: false }
            })
          );
        }
      });
  }

  componentDidUpdate() {
    if (this.state.finished && !this.state.resultsPosted) {
      console.log("Sending results");
      this.postResults();
    }
  }
  finishExam() {
    alert("Finishing exam!");
    this.setState(
      update(this.state, {
        finished: { $set: true }
      })
    );
  }
  render() {
    return (
      <Container>
        <Title>FILEX Placement Exam</Title>
        <PersonalInfoWithCondition
          condition={this.state.section === "info"}
          sendInfo={this.handleInfo}
        />
        <TestWithCondition
          condition={this.state.section === "test" && !this.state.finished}
          section={this.state.testSection}
          sendResults={this.handleResults}
          onFinished={this.finishExam}
        />
        <FinishedMessageWithCondition
          condition={this.state.section === "test" && this.state.finished}
          testID={this.state.testID}
          error={this.state.postingError}
          postResults={this.postResults}
        />
      </Container>
    );
  }
}

export default App;
