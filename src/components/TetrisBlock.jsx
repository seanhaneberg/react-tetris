import React, { Component } from 'react';

class TetrisBlock extends Component {

  render() {
    let block = this.props.blocked ? "*" : "-";
    return (<g> {block} </g>)
  }
}

export default TetrisBlock;