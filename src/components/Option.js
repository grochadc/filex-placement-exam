import React from 'react';

function Option(props){
  return (
    <div className="option">
      <input
        type="radio"
        name={'q'+props.qIndex}
        onChange={() => props.sendAnswer(props.item)}
        value={props.text}
        />
      {props.item === 0 ? 'a)' : props.item === 1 ? 'b)' : props.item === 2 ? 'c)' : 'd)'} {props.text}
    </div>
    );
}

export default Option;
