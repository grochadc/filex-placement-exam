import React from 'react';

export default function conditioned(Component, props){
  if(props.condition){
    return <Component {...props} />;
  } else{
    return null;
  }
}
