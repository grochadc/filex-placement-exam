import React, {Component} from 'react';
import Option from './Option';

class Question extends Component {
  constructor(props){
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);
  }
  handleAnswer(answer){
    this.props.checkAnswer(this.props.index, answer);
  }
  render() {
    return (
      <div className="question">
        {this.props.info.title}

        <div>{this.props.info.options.map((option, i)  => <Option text={option.text} item={i} key={i} sendAnswer={this.handleAnswer}/>)}</div>
      </div>
    );
  }
}

export default Question;
