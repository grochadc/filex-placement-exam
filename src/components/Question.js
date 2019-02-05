import React, { Component } from "react";
import Option from "./Option";
import styled from "styled-components";

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;
const QuestionTitle = styled.div`
  margin-bottom: 10px;
`;

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);
  }
  handleAnswer(answer) {
    this.props.checkAnswer(this.props.index, answer);
  }
  render() {
    return (
      <QuestionContainer>
        <QuestionTitle>
          {this.props.index + 1}
          {". "}
          {this.props.info.title}
        </QuestionTitle>
        <div>
          {this.props.info.options.map((option, i) => (
            <Option
              text={option.text}
              item={i}
              key={i}
              qIndex={this.props.index}
              sendAnswer={this.handleAnswer}
            />
          ))}
        </div>
      </QuestionContainer>
    );
  }
}

export default Question;
