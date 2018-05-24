import React from 'react';

function PersonalInfo(props){
  return (
    <div className="personal-data">
    <label for="name">Nombre: </label><input type="text" id="name" /> <label for="code">Codigo: </label><input type="text" id="code" /><br />
    <label for="major">Carrera: </label><input type="text" id="major" /><br />
    <label for="email">eMail: </label><input type="text" id="email" /> <label for="cel">Celular: </label><input type="text" id="cel" /><br />
    </div>
  )
}

export default PersonalInfo;
