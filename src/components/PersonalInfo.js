import React, { Component } from "react";
import { Container } from "./Presentational";

const majors = [
  { value: "agn", option: "Agronegocios" },
  { value: "agbt", option: "Agrobiotecnologia" },
  { value: "academico", option: "Academico" },
  { value: "administrativo", option: "Administrativo" },
  { value: "mcpe", option: "Medico Cirujano Partero" },
  { value: "externo", option: "Externo" },
  { value: "mvz", option: "Medicina Veterinaria" },
  {
    value: "slpce",
    option: "Seguridad Laboral Proteccion Civil y Emergencias"
  },
  { value: "ldts", option: "Desarrollo Turistico Sustentable" },
  { value: "lenf", option: "Lic. Enfermeria" },
  { value: "tenf", option: "Tecnico en Enfermeria" },

  { value: "otro", option: "Otro" }
];

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { contact: null };
  }
  handleSubmit(event) {
    event.preventDefault();
    let contact = {
      name: this.refs.name.value,
      major: this.refs.major.value,
      code: this.refs.code.value,
      email: this.refs.email.value,
      cellphone: this.refs.cellphone.value
    };

    let completed = [];
    for (let k in contact) {
      completed.push(contact[k].length > 0 ? true : false);
    }
    if (completed.every(v => v)) {
      this.props.sendInfo(contact);
    } else {
      alert("Complete your personal information first");
    }
  }
  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Nombre: </label>
          <input type="text" id="name" ref="name" />{" "}
          <label htmlFor="code">Codigo: </label>
          <input type="text" id="code" ref="code" />
          <br />
          <label htmlFor="major">Carrera: </label>
          <select name="major" ref="major">
            <option value="" disabled selected>
              Select your major
            </option>
            {majors.map((m, i) => (
              <option key={i} value={m.value}>
                {m.option}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="email">eMail: </label>
          <input type="email" id="email" ref="email" />{" "}
          <label htmlFor="cel">Celular: </label>
          <input type="text" id="cel" ref="cellphone" />
          <br />
          <button type="submit">Submit and Show Test</button>
        </form>
      </Container>
    );
  }
}

export default PersonalInfo;
