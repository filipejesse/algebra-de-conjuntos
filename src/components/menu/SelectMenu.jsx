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
    this.partiallyOrderedSets = this.partiallyOrderedSets.bind(this);
    this.lessThanThat = this.lessThanThat.bind(this);
    this.moreThanThat = this.moreThanThat.bind(this);
    this.equalsThan = this.equalsThan.bind(this);
    this.toTheSecondPower = this.toTheSecondPower.bind(this);
    this.beSqrt = this.beSqrt.bind(this);
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

  firstValue() {

    let text = this.props.xmlFile;
    let first = this.state.first;
    let valueFirst = [];

    text.forEach(x => {
      if (x.nome === first) {
        valueFirst = x.valor;
      }
    })
    return valueFirst;
  }

  secondValue() {

    let text = this.props.xmlFile;
    let second = this.state.second;
    let valueSecond = [];

    text.forEach(x => {
      if (x.nome === second) {
        valueSecond = x.valor;
      }
    })
    return valueSecond;
  }

  unionSet() {
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let inter = [];

    let exp = /[A-Z]/g
    if (first.match(exp) && second.match(exp)) {

      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          if(inter.indexOf(valueSecond[j]) === -1){
            inter.push(valueSecond[j]);
          }
        }
      }

      let string = '(' + first + ' ∪ ' + second + ') = { ';

      for (let i = 0; i < inter.length; i++) {
      string += inter[i] + ',';
      }

      string += '}';
      string = string.replace(',}', ' }');
      document.getElementById('result').innerHTML = string;
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }
  }

  interception() {
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let inter = [];

    let exp = /[A-Z]/g
    if (first.match(exp) && second.match(exp)) {
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          if (valueFirst[i] === valueSecond[j]) {
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
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();

    let exp = /[A-Z]/g;
    if (!first.match(exp) && second.match(exp) || first.match(exp) && !second.match(exp)) {

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
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();

    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {
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
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();

    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {
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
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();

    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {

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

  partiallyOrderedSets() {
    let first = this.state.first;
    let valueFirst = this.firstValue();

    let exp = /[A-Z]/g;
    if (first.match(exp)) {
      let lengthSet = Math.pow(2, valueFirst.length);
      let matriz = [valueFirst.length];

      for (let i = 0; i < lengthSet; i++) {
        matriz[i] = [valueFirst.length];
      }
      for (let i = 0; i < lengthSet; i++) {
        for (let j = 0; j < valueFirst.length; j++) {
          matriz[i][j] = valueFirst[j];
        }
      }

      let binario = [];
      let max = (lengthSet - 1).toString(2).length;
      for (let i = 0; i < lengthSet; i++) {
        let exp = /[\d]/g;
        if (i.toString(2).length < max) {
          binario[i] = i.toString(2).match(exp);
          while (binario[i].length < max) {
            let temp = max - binario[i].length;
            binario[i] = [];
            for (let j = 0; j < temp; j++) {
              binario[i][j] = "0";
            }
            for (let c = 0; c < i.toString(2).length; c++) {
              binario[i].push(i.toString(2).match(exp)[c]);
            }


          }
        }
        else {
          binario[i] = i.toString(2).match(exp);
        }
      }



      console.log(binario);
      let string = '';

      string = 'P(' + first + ') = { ';

      for(let x = 0; x < lengthSet; x++) {

        string += '{ ';
        for(let y = 0; y < max; y++){
          if(binario[x][y] === "1") {
            string += matriz[x][y] + ',';
          }
        }
        string += ' }';
        string = string.replace(', }', ' }, ');
      }

      string += '}';
      string = string.replace(', }', ' }');

      document.getElementById('result').innerHTML = string;
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione um conjunto';
    }
  }

  lessThanThat() {
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let result = [] ;
    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          if (valueFirst[i] < valueSecond[j]) {
            result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
          }
        }
      }
      document.getElementById('result').innerHTML = "("+first+" < "+second+") => " + this.toText(result);
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }
  }

  moreThanThat() {
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let result = [] ;
    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          if (valueFirst[i] > valueSecond[j]) {
            result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
          }
        }
      }
      document.getElementById('result').innerHTML = "("+first+" > "+second+") => " + this.toText(result);
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }
  }

  equalsThan() {
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let result = [] ;
    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          if (valueFirst[i] === valueSecond[j]) {
            result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
          }
        }
      }
      document.getElementById('result').innerHTML = "("+first+" = "+second+") => " + this.toText(result);
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }
  }
  toTheSecondPower() {
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let result = [] ;
    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          if (Math.sqrt(valueFirst[i]) === valueSecond[j]) {
            result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
          }
        }
      }
      document.getElementById('result').innerHTML = "("+first+"² = "+second+") => " + this.toText(result);
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }
  }

  beSqrt() {
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let result = [] ;
    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          if (Math.pow(valueFirst[i], 2) === valueSecond[j]) {
            result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
          }
        }
      }
      document.getElementById('result').innerHTML = "( V"+first+" = "+second+") => " + this.toText(result);
    }
    else {
      document.getElementById('result').innerHTML = 'Selecione dois conjuntos';
    }
  }

  notFound() {
    document.getElementById('result').innerHTML = 'Função não pronta';
  }

  toText(text){
    let result = "{ ";
    text.forEach(x => {
      result += x + ", ";
    });
    result += "}";
    result = result.replace(", }", " }");
    return result;
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
            <Button isColor="info" isOutlined onClick={this.elementsOf}>∈</Button>
            <Button isColor="primary" isOutlined onClick={this.elementsOf}>∉</Button>
            <Button isColor="info" isOutlined onClick={this.contains}>⊆</Button>
            <Button isColor="primary" isOutlined onClick={this.contains}>⊈</Button>
            <Button isColor="info" isOutlined onClick={this.properlyContains}>⊂</Button>
            <Button isColor="primary" isOutlined onClick={this.properlyContains}>⊄</Button>
            <Button isColor="info" isOutlined onClick={this.unionSet}>∪</Button>
            <Button isColor="primary" isOutlined onClick={this.interception}>∩</Button>
            <Button isColor="info" isOutlined onClick={this.cartesian}>x</Button>
            <Button isColor="primary" isOutlined onClick={this.partiallyOrderedSets}>P(A)</Button>
          </Column>
        </Columns>
        <Box id="result">
        </Box>
        <Columns>
          <Column>
            <Button isColor="success" isOutlined onClick={this.lessThanThat}>(Menor que)</Button>
            <Button isColor="info" isOutlined onClick={this.moreThanThat}> (Maior que) </Button>
            <Button isColor="success" isOutlined onClick={this.equalsThan}>(Igual à)</Button>
            <Button isColor="info" isOutlined onClick={this.toTheSecondPower}> (Quadrado de) </Button>
            <Button isColor="success" isOutlined onClick={this.beSqrt}>(Raiz quadrada de)</Button>
          </Column>
        </Columns>
      </Field>
    );
  }
}

export default SelectMenu;