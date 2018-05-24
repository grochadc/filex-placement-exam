import React, {Component} from 'react';

class PersonalInfo extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { contact: null };
  }
  handleSubmit(event){
    event.preventDefault();
    let contact ={
      name: this.refs.name.value,
      major: this.refs.major.value,
      code: this.refs.code.value,
      email: this.refs.email.value,
      cellphone: this.refs.cellphone.value
    };

    let completed = [];
    for(let k in contact){
      completed.push(contact[k].length > 0 ? true : false);
    }
    if(completed.every(v => v)){
        this.props.sendInfo(contact);
    } else {
      alert('Complete your personal information first');
    }
  }
  render(){
    return (
      <div className="personal-data">
      <form onSubmit={this.handleSubmit}>
      <label htmlFor="name">Nombre: </label><input type="text" id="name" ref="name" /> <label htmlFor="code">Codigo: </label><input type="text" id="code" ref="code"/><br />
      <label htmlFor="major">Carrera: </label><input type="text" id="major" ref="major" /><br />
      <label htmlFor="email">eMail: </label><input type="email" id="email" ref="email" /> <label htmlFor="cel">Celular: </label><input type="text" id="cel" ref="cellphone"/><br />
      <button type="submit">Submit and Show Test</button>
      </form>
      </div>
    );
  }
}

export default PersonalInfo;
