import React, { Component } from 'react';
import { Container, Columns, Column, Box, Title } from 'bloomer';
import UploadFile from '../components/UploadFile';
import Txt2Json from '../components/Txt2Json';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xmlFile: []
   }
    this.handler = this.handler.bind(this);
  }

  handler(state) {
    this.setState(state);
  }



  render() {
    return (
      <Container>
        <Columns>
          <Column isSize="1/3">
            <Title>Menu</Title>
            <Box>
              <UploadFile handler={this.handler} xmlFile={this.state.xmlFile} />
              <Txt2Json handler={this.handler} xmlFile={this.state.xmlFile} />
            </Box>
            <Title>Data</Title>
            <Box>

            </Box>
          </Column>
          <Column isSize="2/3">
            <Title>Results</Title>
            <Box>

            </Box>
          </Column>
        </Columns>
      </Container>
    );
  }
}

export default Home;