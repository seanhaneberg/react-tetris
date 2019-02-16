import React, { Component } from 'react';

class TetrisController extends Component {
  constructor(props) {
    super(props);

    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleRotateLeft = this.handleRotateLeft.bind(this);
    this.handleRotateRight = this.handleRotateRight.bind(this);

    this.game = props.game;

  }

  handleMoveLeft() {
    this.game.handleMoveLeft();
  }

  handleMoveRight() {
    this.game.handleMoveRight();
  }

  handleRotateLeft() {
    this.game.handleRotateLeft();
  }

  handleRotateRight() {
    this.game.handleRotateRight();
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }



  render() {
    // let output =
    //   <g>
    //     <div style={background - color="#FF0000"} onClick={this.handleMoveLeft} />
    //     <div style={background - color="#00FF00"} onClick={this.handleRotation} />
    //     <div style={background - color="#0000FF"} onClick={this.handleRight} />
    //   </g>

    // return ({output});
    return (<g/>);
  }
}

export default TetrisController;