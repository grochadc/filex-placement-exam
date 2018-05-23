/*jshint esversion: 6*/
import React, {Component} from 'react';
import Question from './Question';
import Data from '../database/Questions.json';


const questions = Data.questions; //From Questions.json

class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
      answers: new Array(questions.length)
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkAnswer(question, answer){
    let correct = questions[question].options[answer].correct;
    let newAnswers = [
      ...this.state.answers.slice(0,question),
      correct,
      ...this.state.answers.slice(question+1)
    ];

    this.setState({answers: newAnswers});
  }

  handleSubmit() {
    alert(this.state.answers.filter(v => v).length);
  }

  render() {
    return (
      <div className="test">
        {questions.map((question, i) =>
          <Question
            info={question}
            index={i}
            key={i}
            checkAnswer={this.checkAnswer}
            />
          )}
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Test;
