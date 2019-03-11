import React, { Component } from 'react';
import { Container, Columns, Column, Box, Title } from 'bloomer';
import UploadFile from '../components/UploadFile';
import Txt2Json from '../components/Txt2Json';
import SelectMenu from '../components/menu/SelectMenu';
import ShowSets from '../components/ShowSets';


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
              <Columns>
                <UploadFile handler={this.handler} xmlFile={this.state.xmlFile} />
                <Txt2Json handler={this.handler} xmlFile={this.state.xmlFile} />
              </Columns>
            </Box>
            <Title>Data</Title>
            <Box>
              <ShowSets xmlFile={this.state.xmlFile} />
            </Box>
          </Column>
          <Column isSize="2/3">
            <Title>Results</Title>
            <Box>
              <SelectMenu handler={this.handler} xmlFile={this.state.xmlFile} />
            </Box>
          </Column>
        </Columns>
      </Container>
    );
  }
}

export default Home;