import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Base64 } from 'js-base64';
import { Column } from 'bloomer';

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    }
    this.getFile = this.getFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({
      file: ''
    });
  }

  getFile(file) {
    let temp = file.base64;
    let pos = temp.indexOf(',')
    temp = Base64.decode(temp.substring(pos));
    console.log(temp);
    this.setState({file: temp});

    this.props.handler({xmlFile: this.state.file});

  }

  render() {
    return (
      <Column>
        <FileBase64 multiple={false} onDone={this.getFile} />
      </Column>
    )
  }

}

export default UploadFile;
