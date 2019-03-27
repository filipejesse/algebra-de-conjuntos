import React, { Component } from 'react';
import { Field, Label, Control, Select, Button, Columns, Column, Box, Tag } from 'bloomer';

class SelectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      second: '',
      third: '',
      three: false,
      isFuncional: false,
      isInjetora: false,
      isSobrejetora: false,
      isTotal: false,
      isMonomorfa: false,
      isEpimorfa: false,
      isIsomorfa: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.populateSelect = this.populateSelect.bind(this);
    this.unionSet = this.unionSet.bind(this);
    this.interception = this.interception.bind(this);
    this.elementsOf = this.elementsOf.bind(this);
    this.callContains = this.callContains.bind(this);
    this.properlyContains = this.properlyContains.bind(this);
    this.cartesian = this.cartesian.bind(this);
    this.partiallyOrderedSets = this.partiallyOrderedSets.bind(this);
    this.comparations = this.comparations.bind(this);
    this.notFound = this.notFound.bind(this);


    this.isFunctional = this.isFunctional.bind(this);
    this.setTemp = this.setTemp.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
      });


  }

  populateSelect() {
    let text = this.props.xmlFile;
    if (typeof (text) !== 'string') {
      text.forEach(x => {
        if (!document.getElementById(x.nome)) {
          document.getElementById('selectA').innerHTML += '<option id="' + x.nome + '" value="' + x.nome + '">' + x.nome + '</option>'
          document.getElementById('selectB').innerHTML += '<option id="' + x.nome + '" value="' + x.nome + '">' + x.nome + '</option>'
          document.getElementById('selectC').innerHTML += '<option id="' + x.nome + '" value="' + x.nome + '">' + x.nome + '</option>'
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

  thirdValue() {

    let text = this.props.xmlFile;
    let third = this.state.third;
    let valueThird = [];

    text.forEach(x => {
      if (x.nome === third) {
        valueThird = x.valor;
      }
    })
    return valueThird;
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

  callContains() {
    let first = this.state.first;
    let second = this.state.second;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let exp = /[A-Z]/g;

    if (first.match(exp) && second.match(exp)) {
      let contain = this.contains(valueFirst, valueSecond);
      if(contain){
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

  contains(valueFirst, valueSecond) {

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
        return true;
      }
      else {
        return false;
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

  comparations(event) {
    let operation = event.target.value;
    console.log(operation);
    let first = this.state.first;
    let second = this.state.second;
    let third = this.state.third;
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let valueThird = this.thirdValue();
    let result1 = [] ;
    let result2 = [];
    let finalResult = [];
    let text;
    let exp = /[A-Z]/g;
    if (first.match(exp) && second.match(exp)) {
      result1 = this.comparation(valueFirst, valueSecond, operation);
      if(this.state.three){
        if(third.match(exp)) {
          result2 = this.comparation(valueSecond, valueThird, operation);
          for(let i = 0; i < result1.length; i++){
            for(let j = 0; j < result2.length; j++){
              if(result1[i] === result2[j]){
                finalResult.push(result1[i]);
              }
            }
          }
          text = "("+first+" "+operation+" "+third+") => " + this.toText(finalResult);
          }
          else {
            text = 'Selecione apenas conjuntos';
          }
        }
        else {
          text = "("+first+" "+operation+" "+second+") => " + this.toText(result1);
        }
      }
      else {
        text = 'Selecione apenas conjuntos';
      }
      document.getElementById('result').innerHTML = text;
    }

  comparation(valueFirst, valueSecond, operation) {
      let result = []
      for (let i = 0; i < valueFirst.length; i++) {
        for (let j = 0; j < valueSecond.length; j++) {
          switch(operation){
            case "<":
              if (valueFirst[i] < valueSecond[j]) {
                result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
              }
              break;
            case ">":
              if (valueFirst[i] > valueSecond[j]) {
                result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
              }
              break;
            case "=":
              if (valueFirst[i] === valueSecond[j]) {
                result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
              }
              break;
            case "sqrt":
              if (Math.sqrt(valueFirst[i]) === valueSecond[j]) {
                result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
              }
              break;
            case "raiz":
              if (Math.pow(valueFirst[i]) === valueSecond[j]) {
                result.push("<"+valueFirst[i]+", "+valueSecond[j]+">");
              }
              break;
            default:
              console.log("Operação invalida!");
              break
          }
        }
      }
      return result;
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

  isFunctional() {
    let valueFirst = this.firstValue();
    let valueSecond = this.secondValue();
    let valueThird = this.thirdValue();
    let test1 = this.contains(valueFirst, valueSecond);
    if(test1){
      if(this.state.three){
        let test2 = this.contains(valueSecond, valueThird);
        if(test2){
          console.log("1 - "+ valueSecond + " " + valueThird);
          return true;
        }
        return false;
      }
      console.log("2 - "+ valueFirst + " " + valueSecond + " " + this.state.isFuncional);
      return true;
    }
    return false;
  }

setTemp(){
  let teste = this.isFunctional();
  if(teste){
    this.setState({
      isFuncional: true
    });
  }
  else{
    this.setState({
      isFuncional: false
    });
  }
}



  render() {
    this.populateSelect();
    return (
      <Field>
        <Columns>
          <Label>Select:</Label>
          <Control>
            <Column>
              <Select name="first" id="selectA" onChange={this.handleInputChange}>
                <option hidden>Select...</option>
              </Select>
              <Select name="second" id="selectB" onChange={this.handleInputChange}>
                <option hidden>Select...</option>
              </Select>
              <Select name="third" id="selectC" onChange={this.handleInputChange}>
                <option hidden>Select...</option>
              </Select>
            </Column>
          </Control>
        </Columns>
        <Columns>
          <Column>
            <Button isColor="info" isOutlined onClick={this.elementsOf}>∈</Button>
            <Button isColor="primary" isOutlined onClick={this.elementsOf}>∉</Button>
            <Button isColor="info" isOutlined onClick={this.callContains}>⊆</Button>
            <Button isColor="primary" isOutlined onClick={this.callContains}>⊈</Button>
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
        <Box>
          <Button isColor="primary" isOutlined onClick={this.setTemp}>Verify</Button>
          {this.state.isFuncional ?
            <Tag isColor="success">Is Functional</Tag> : <Tag isColor="danger">Isn't Functional</Tag> }
        </Box>
        <Columns>
            <label className="switch">
                <input name="three" type="checkbox" checked={this.state.three} onChange={this.handleInputChange} />
                <div className="slider round"></div>
            </label>
            {this.state.three ?
              <Tag isColor="success">3 Sets</Tag> : <Tag isColor="danger">2 Sets</Tag>}
          <Column>
            <Button isColor="success" isOutlined onClick={this.comparations} value="<">(Menor que)</Button>
            <Button isColor="info" isOutlined onClick={this.comparations} value=">"> (Maior que) </Button>
            <Button isColor="success" isOutlined onClick={this.comparations} value="=">(Igual à)</Button>
            <Button isColor="info" isOutlined onClick={this.comparations} value="sqrt"> (Quadrado de) </Button>
            <Button isColor="success" isOutlined onClick={this.comparations} value="raiz">(Raiz quadrada de)</Button>
          </Column>
        </Columns>
      </Field>
    );
  }
}

export default SelectMenu;