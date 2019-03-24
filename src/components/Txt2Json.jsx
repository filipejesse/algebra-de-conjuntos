import React, { Component } from 'react';
import { Button, Column } from 'bloomer';

class Txt2Json extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let text = this.props.xmlFile;
    text = text.replace(/\s+/g, "");
    let exp = /(?<name>\w)(=)({)?(?<content>[0-9,]+)?(})?/g;
    let result = "[";
    let matches = text.match(exp);

    matches.forEach(x => {
      result += x.replace(exp, "{\"nome\":\"$<name>\",\"valor\":[$<content>]},");
    });
    
    result += "]";
    result = result.replace("},]", "}]")
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