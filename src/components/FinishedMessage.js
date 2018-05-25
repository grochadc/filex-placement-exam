import React from 'react';

function FinishedMessage(props){
  return (
    <div>
      <h2>You have finished the exam.</h2>
      <p>Please save this id: {props.testID}</p>
    </div>
  );
}

export default FinishedMessage;
