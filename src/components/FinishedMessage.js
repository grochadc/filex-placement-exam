import React from "react";

function FinishedMessage(props) {
  return props.error ? (
    <div>
      <p>
        There was an error posting your results. Please check your connection
        and try again:
      </p>
      <button onClick={props.postResults}>Send Results</button>
    </div>
  ) : (
    <div>
      <h2>You have finished the exam.</h2>
      <p>Please save this id: {props.testID}</p>
    </div>
  );
}

export default FinishedMessage;
