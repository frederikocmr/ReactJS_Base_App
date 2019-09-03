import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {
  // Definir quais são os valores padrões para as propriedades caso não seja informado nada.
  static defaultProps = {}

  // Definir tipo das propriedades deste componente.
  static propTypes = {}

  state = {
    newTech: '',
    techs: []
  };

  // Executado assim que o componente aparece em tela
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if (techs) {
      this.setState({ techs: JSON.parse(techs) })
    }

  }

  // Executado sempre que houver alterações nas props ou estado. Pode acessar valores anteriores.
  componentDidUpdate(prevProps, prevState) {
    // Acessar this.props ou this.state

    // Gravando no storage toda vez que muda dados
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  //Executado quando o componente irá deixar de existir. 
  componentWillUnmount() {
    // Bom para destruir event listener.
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();


    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    });
  }

  handleDelete = (tech) => {
    this.setState({
      techs: this.state.techs.filter(t => t !== tech)
    })

  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>

        <ul>
          {this.state.techs.map(tech =>
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          )}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>

      </form>
    )
  }
}

export default TechList;