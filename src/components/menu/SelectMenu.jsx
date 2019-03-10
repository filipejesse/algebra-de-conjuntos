import React, { Component } from 'react';
import { Field, Label, Control, Select, Button, Columns, Column, Box } from 'bloomer';
class SelectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      second: ''
    }
    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.populateSelect = this.populateSelect.bind(this);
    this.unionSet = this.unionSet.bind(this);
    this.interception = this.interception.bind(this);
    this.elementsOf = this.elementsOf.bind(this);
    this.contains = this.contains.bind(this);
    this.properlyContains = this.properlyContains.bind(this);
    this.cartesian = this.cartesian.bind(this);

    this.notFound = this.notFound.bind(this);
  }

  handleChangeA(event) {
    let value = event.target.value;
    this.setState({
      first: value
    });
    console.log(value);
  }

  handleChangeB(event) {
    let value = event.target.value;
    this.setState({
      second: value
    });
    console.log(value);

  }

  populateSelect() {
    let text = this.props.xmlFile;
    if (typeof (text) !== 'string') {
      text.forEach(x => {
        if (!document.getElementById(x.nome)) {
          document.getElementById('selectA').innerHTML += '<option id="' + x.nome + '" value="' + x.nome + '">' + x.nome + '</option>'
          document.getElementById('selectB').innerHTML += '<option id="' + x.nome + '" value="' + x.nome + '">' + x.nome + '</option>'
        }
      });
    }
  }

  unionSet() {
    let text = this.props.xmlFile;
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst;
    let valueSecond;

    let exp = /[A-Z]/g
    if (first.match(exp) && second.match(exp)) {

      text.forEach(x => {
        if (x.nome === first) {
          valueFirst = x.valor;
        }
        if (x.nome === second) {
          valueSecond = x.valor;
        }
      })

      document.getElementById('result').innerHTML = '(' + first + ' ∪ ' + second + ') = {' + valueFirst + ',' + valueSecond + '}';
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }
  }

  interception() {
    let text = this.props.xmlFile;
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst;
    let valueSecond;
    let inter = [];

    let exp = /[A-Z]/g
    if (first.match(exp) && second.match(exp)) {

      text.forEach(x => {
        if (x.nome === first) {
          valueFirst = x.valor;
        }
        if (x.nome === second) {
          valueSecond = x.valor;
        }
      })

      for(let i = 0; i < valueFirst.length; i++) {
        for(let j = 0; j < valueSecond.length; j++) {
          if(valueFirst[i] === valueSecond[j]){
            inter.push(valueFirst[i]);
          }
        }
      }

      document.getElementById('result').innerHTML = '(' + first + ' ∩ ' + second + ') = {' + inter + '}';
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }
  }

  elementsOf() {
    let text = this.props.xmlFile;
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = [];
    let valueSecond = [];

    let exp = /[A-Z]/g;
    if (!first.match(exp) && second.match(exp) || first.match(exp) && !second.match(exp)) {

      text.forEach(x => {
        if (x.nome === first) {
          valueFirst = x.valor;
        }
        if (x.nome === second) {
          valueSecond = x.valor;
        }
      })

      if (first.match(exp)) {
        for (let i = 0; i < valueFirst.length; i++) {
          if (parseInt(valueFirst[i]) === parseInt(valueSecond)) {
            document.getElementById('result').innerHTML = valueSecond + ' pertence ao conjunto ' + first;
            break;
          }
          else {
            document.getElementById('result').innerHTML = valueSecond + ' não pertence ao conjunto ' + first;
          }
        }
      }
      else {
        for (let i = 0; i < valueSecond.length; i++) {
          if (parseInt(valueSecond[i]) === parseInt(valueFirst)) {
            document.getElementById('result').innerHTML = valueFirst + ' pertence ao conjunto ' + second;
            break;
          }
          else {
            document.getElementById('result').innerHTML = valueFirst + ' não pertence ao conjunto ' + second;
          }
        }
      }
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione um conjunto e um elemento';
    }
  }

  contains() {
    let text = this.props.xmlFile;
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = [];
    let valueSecond = [];

    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {

      text.forEach(x => {
        if (x.nome === first) {
          valueFirst = x.valor;
        }
        if (x.nome === second) {
          valueSecond = x.valor;
        }
      })

      let cont = 0;
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          if (valueFirst[i] === valueSecond[j]) {
            cont++;
            break;
          }
        }
      }
      if (cont === valueFirst.length) {
        document.getElementById('result').innerHTML = 'O conjunto ' + first + ' está contido em ' + second;
      }
      else {
        document.getElementById('result').innerHTML = 'O conjunto ' + first + ' não está contido em ' + second;
      }
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }


  }

  properlyContains() {
    let text = this.props.xmlFile;
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = [];
    let valueSecond = [];

    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {

      text.forEach(x => {
        if (x.nome === first) {
          valueFirst = x.valor;
        }
        if (x.nome === second) {
          valueSecond = x.valor;
        }
      })

      let cont = 0;
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          if (valueFirst[i] === valueSecond[j]) {
            cont++;
            break;
          }
        }
      }
      if (cont === valueFirst.length && valueFirst.length !== valueSecond.length) {
        document.getElementById('result').innerHTML = 'O conjunto ' + first + ' está contido própriamente em ' + second;
      }
      else {
        document.getElementById('result').innerHTML = 'O conjunto ' + first + ' não está contido própriamente em ' + second;
      }
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }


  }

  cartesian() {
    let text = this.props.xmlFile;
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = [];
    let valueSecond = [];

    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {

      text.forEach(x => {
        if (x.nome === first) {
          valueFirst = x.valor;
        }
        if (x.nome === second) {
          valueSecond = x.valor;
        }
      })

      document.getElementById('result').innerHTML = first + ' x ' + second + ' = {'
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          document.getElementById('result').innerHTML += '<' + valueFirst[i] + ', ' + valueSecond[j] + '>, ';
        }
      }
      document.getElementById('result').innerHTML += '}';


    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }


  }

  notFound() {
    document.getElementById('result').innerHTML = 'Função não pronta';
  }

  render() {
    this.populateSelect();
    return (
      <Field>
        <Columns>
          <Label>Select:</Label>
          <Control>
            <Column>
              <Select id="selectA" onChange={this.handleChangeA}>
                <option hidden>Select...</option>
              </Select>
              <Select id="selectB" onChange={this.handleChangeB}>
                <option hidden>Select...</option>
              </Select>
            </Column>
          </Control>
        </Columns>
        <Columns>
          <Column>
            <Button isColor="info" onClick={this.elementsOf}>∈</Button>
            <Button isColor="primary" onClick={this.elementsOf}>∉</Button>
            <Button isColor="info" onClick={this.contains}>⊆</Button>
            <Button isColor="primary" onClick={this.contains}>⊈</Button>
            <Button isColor="info" onClick={this.properlyContains}>⊂</Button>
            <Button isColor="primary" onClick={this.properlyContains}>⊄</Button>
            <Button isColor="info" onClick={this.notFound}>⊃</Button>
            <Button isColor="primary" onClick={this.notFound}>⊅</Button>
            <Button isColor="info" onClick={this.unionSet}>∪</Button>
            <Button isColor="primary" onClick={this.interception}>∩</Button>
            <Button isColor="info" onClick={this.cartesian}>x</Button>
            <Button isColor="primary" onClick={this.notFound}>P(A)</Button>
          </Column>
        </Columns>
        <Box id="result">

        </Box>
      </Field>
    );
  }
}

export default SelectMenu;