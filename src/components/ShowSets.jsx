import React, { Component } from 'react';
import { Table } from 'bloomer';

class ShowSets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    }
    this.printSet = this.printSet.bind(this);
  }

  printSet() {
    let text = this.props.xmlFile;
    if (typeof (text) !== 'string') {
      text.forEach(x => {
        let exp = /[a-z]/g;
        if(x.nome.match(exp)){
          document.getElementById("screen").innerHTML += "<tr><td>" + x.nome + "</td><td> " + x.valor + "  </td></tr>";
        }
        else{
          document.getElementById("screen").innerHTML += "<tr><td>" + x.nome + "</td><td> { " + x.valor + " }   </td></tr>";
        }
      })
    }
  }



  render() {
    this.printSet();
    return (
      <div>
        <Table isBordered isStriped isNarrow>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody id="screen">
          </tbody>
        </Table>
      </div>
    )
  }

}

export default ShowSets;
