/*jshint esversion: 6*/
import React, {Component} from 'react';
import update from 'immutability-helper';
import Question from './Question';
import data from '../database/Questions.json';

class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: data.sections[props.section].questions, //From Questions.json
      answers: new Array(data.sections[props.section].questions.length)
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState(update(this.state, {
      questions: {$set: data.sections[nextProps.section].questions}
    }));
  }
  checkAnswer(question, answer){
    let correct = this.state.questions[question].options[answer].correct;

    let newState = update(this.state, {answers: {[question]: {$set:correct}}});

    this.setState(newState);
  }

  handleSubmit() {
    let correctAnswers = this.state.answers.filter(v => v).length;
    let unanswered = this.state.answers.filter(item => item===undefined).length;
    if(unanswered > 0){
      alert('You didn\'t finish the section');
    }

    this.props.sendResults({
      correctAnswers,
      section: this.props.section,
      finished: this.props.section+1 === data.sections.length ? true : false
    });
  }

  render() {
    return (
      <div className="test">
      <h2>Section {this.props.section+1}</h2>
        <div className="question-form">
        {this.state.questions.map((question, i) =>
          <Question
            info={question}
            index={i}
            key={i}
            checkAnswer={this.checkAnswer}
            />
          )}
        <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Test;
