import React from "react";
import styled from "styled-components";

const OptionContainer = styled.div`
  margin: 5px 0;
`;
function Option(props) {
  return (
    <OptionContainer>
      <input
        type="radio"
        name={"q" + props.qIndex}
        onChange={() => props.sendAnswer(props.item)}
        value={props.text}
      />
      {props.item === 0
        ? "a)"
        : props.item === 1
          ? "b)"
          : props.item === 2
            ? "c)"
            : "d)"}{" "}
      {props.text}
    </OptionContainer>
  );
}

export default Option;
