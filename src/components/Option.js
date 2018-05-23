import React from 'react';

function Option(props){
  return (
    <div className="option">
      <button onClick={() => props.sendAnswer(props.item)}>
      {props.item === 0 ? 'a)' : props.item === 1 ? 'b)' : props.item === 2 ? 'c)' : 'd)'} {props.text}
      </button>
      </div>
    );
}

export default Option;
