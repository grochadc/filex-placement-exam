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
    let correctAnswers = this.state.answers.filter(v => v).length;
    let unanswered = this.state.answers.filter(item => item===undefined).length;
    let msg = unanswered>0? 'You didn\'t finish the test': correctAnswers >= 6 ? 'You passed!' : 'You failed!';
    alert(msg+' '+correctAnswers+' correct answers.');
  }

  render() {
    return (
      <div className="test">
        <div className="question-form">
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
      </div>
    );
  }
}

export default Test;
