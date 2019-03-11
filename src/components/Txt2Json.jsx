import React, { Component } from 'react';
import { Button, Column } from 'bloomer';

class Txt2Json extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let text = this.props.xmlFile;
    let exp = /[\s]/g;
    let result = text.replace(exp , '');
    exp = /[{]/g;
    result = result.replace(exp, '[');
    exp = /[}]/g;
    result = result.replace(exp, ']}, {"nome": "');
    exp = /[=]/g;
    result = result.replace(exp, '", "valor": ');
    result = '[{"nome": "' + result + '}]';
    exp = /[A-Za-z]/g;
    result = result.replace(', {"nome": "}]', ']')
    result = JSON.parse(result);
    console.log(result);

    this.props.handler({
      xmlFile: result
    });
  }

  render() {
    return (
      <Column>
        <Button isColor='info' onClick={this.handleSubmit}>Select</Button>
      </Column>

    );
  }
}

export default Txt2Json;