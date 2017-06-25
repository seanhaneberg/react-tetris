import React, { Component } from 'react';


class TetrisBlock extends Component {
  render() {
    let width = this.props.width;
    let height = this.props.height;
    let x = this.props.x * width;
    let y = this.props.y * height;
    return (<g><rect stroke="#000000" fill="#0033FF" x={x} y={y} width={width} height={height} /></g>);
  }
}


class TetrisPiece extends Component {
  render() {
    let width = this.props.blockWidth;
    let height = this.props.blockHeight;
    let x = this.props.x;
    let y = this.props.y;
    let shape = this.props.shape;

    var blocks = [];
    for (var i = 0; i < shape.length; i++) {
      let xPos = x + shape[i][0];
      let yPos = y + shape[i][1];

      blocks.push(<TetrisBlock key={i} x={xPos} y={yPos} width={width} height={height} />);
    }

    return (<g> {blocks} </g>);
  }
}

export default TetrisPiece;