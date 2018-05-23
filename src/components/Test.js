import React, {Component} from 'react';
import Question from './Question';

class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
        questions: [
                { title: "Jessica _______ a good dancer.",
                  options: [
                    {text: 'are', correct: false},
                    {text: 'be', correct: false},
                    {text:'not be', correct: false},
                    {text: 'is', correct: true}
                  ]
                },
                { title: "What is it? It's a____ .",
                  options: [
                    {text: 'e-book', correct: false},
                    {text: 'cellphone', correct: true},
                    {text:'umbrella', correct: false},
                    {text: 'watches', correct: false}
                  ]
                },
                { title: "A: ______ you Mexican? \n B: Yes, I am.",
                  options: [
                    {text: 'am', correct: false},
                    {text: 'are', correct: true},
                    {text: 'be', correct: false},
                    {text: 'is', correct: false}
                  ]
                }
              ]
    };
    this.checkAnswer = this.checkAnswer.bind(this);
  }
  checkAnswer(question, answer){
    console.log(this.state.questions[question].options[answer].correct);
  }
  render() {
    return (
      <div className="test">
        {this.state.questions.map((question, i) => <Question info={question} index={i} key={i} checkAnswer={this.checkAnswer}/>)}
      </div>
    );
  }
}

export default Test;
