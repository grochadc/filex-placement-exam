/*jshint esversion: 6*/
import React, { Component } from "react";
import update from "immutability-helper";
import Question from "./Question";
import data from "../database/Questions.json";
import styled from "styled-components";

const StyledButton = styled.button`
  margin: 0 20px 30px 0;
`;

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: data.sections[props.section].questions, //From Questions.json
      answers: new Array(data.sections[props.section].questions.length)
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.section + 1 <= data.sections.length) {
      this.setState(
        update(this.state, {
          questions: { $set: data.sections[nextProps.section].questions }
        })
      );
      let elements = document.getElementsByTagName("input");
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
          elements[i].checked = false;
        }
      }
    }
    window.scrollTo(0, 0);
  }

  checkAnswer(question, answer) {
    let correct = this.state.questions[question].options[answer].correct;

    let newState = update(this.state, {
      answers: { [question]: { $set: correct } }
    });

    this.setState(newState);
  }

  handleSubmit({ target }) {
    let correctAnswers = this.state.answers.filter(v => v).length;
    let unanswered = this.state.answers.filter(item => item === null).length;
    if (unanswered > 0) {
      alert("You didn't finish the section");
    }

    let finished =
      this.props.section + 1 === data.sections.length ||
      target.id === "finishButton";

    this.props.sendResults({
      correctAnswers,
      section: this.props.section,
      finished
    });
  }

  render() {
    return (
      <div className="test">
        <h2>Section {this.props.section + 1}</h2>
        <div className="question-form">
          {this.state.questions.map((question, i) => (
            <Question
              info={question}
              index={i}
              key={i}
              checkAnswer={this.checkAnswer}
            />
          ))}
          <StyledButton id="submitButton" onClick={e => this.handleSubmit(e)}>
            Siguiente Sección
          </StyledButton>
          {this.props.section > 0 && (
            <StyledButton id="finishButton" onClick={e => this.handleSubmit(e)}>
              Rendirme
            </StyledButton>
          )}
        </div>
      </div>
    );
  }
}

export default Test;
