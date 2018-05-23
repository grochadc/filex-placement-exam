import React, {Component} from 'react';
import Question from './Question';
import Data from '../database/Questions.json';


const questions = Data.questions; //From Questions.json

class Test extends Component {
  constructor(props){
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
  }
  checkAnswer(question, answer){
    console.log('Answering: ',question);
    console.log(questions[question].options[answer].correct);
  }
  render() {
    return (
      <div className="test">
        {questions.map((question, i) => <Question info={question} index={i} key={i} checkAnswer={this.checkAnswer}/>)}
      </div>
    );
  }
}

export default Test;
