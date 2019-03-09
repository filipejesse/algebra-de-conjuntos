import React, { Component } from 'react';
import { Button } from 'bloomer';

class Txt2Json extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonFile: ''
   }
    this.generateJSON= this.generateJSON.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleSubmit() {

  this.props.handler({
    xmlFile: this.state.jsonFile
  });

  this.setState({
    jsonFile: ''
  });
  }

  generateJSON() {
    let text = this.props.xmlFile;
    let exp = /[\s]/g;
    let result = text.replace(exp , '');
    exp = /[}]/g;
    result = result.replace(exp, '], "');
    exp = /[{]/g;
    result = result.replace(exp, '[');
    exp = /[=]/g;
    result = result.replace(exp, '":');
    result = "{\"" + result + "}";
    exp = /[A-Z]/g;
    result = result.replace(', "}', '}')
    result = JSON.parse(result);
    console.log(result);

    this.setState({
      jsonFile: result
    })
    console.log(this.state.jsonFile);

    this.handleSubmit();

  }



  render() {
    return (
      <div>
        <Button isColor='info' onClick={this.generateJSON}>Show</Button>
      </div>
    );
  }
}

export default Txt2Json;