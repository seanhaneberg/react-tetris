import React, { Component } from 'react';
import TetrisPiece from './TetrisPiece.jsx';

class PieceDefinitions {
  constructor() {
    this.pieces = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],   // [0] I
      [[0, 0], [0, 1], [0, 2], [1, 2]],   // [1] L
      [[0, 0], [1, 0], [0, 1], [0, 2]],   // [2] R (mirror of L)
      [[0, 0], [1, 0], [1, 1], [2, 1]],   // [3] Z
      [[0, 0], [0, 1], [1, 1], [1, 2]],   // [4] S (mirror of Z)
      [[0, 0], [0, 1], [1, 0], [1, 1]],   // [5] X
      [[0, 0], [0, 1], [0, 2], [1, 1]]    // [6] T
    ];
  }
}

class GameConfiguration {
  constructor() {
    this.blockWidth = 20;
    this.blockHeight = this.blockWidth;

    this.columnCount = 10;
    this.rowCount = 22;

    this.playspaceWidth = this.blockWidth * this.columnCount;
    this.playspaceHeight = this.blockHeight * this.rowCount;

    this.enableBonusBlocks = false;
  }
}

class TetrisGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: new GameConfiguration(),
      pieceDefinitions: new PieceDefinitions(),
      pieces: [],
      curPiece: null
    };
  }

  componentDidMount() {
    var self = this;
    this.timer = setInterval(
      function () {
        self.tick();
      },
      1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  createNewPiece() {
    let defs = this.state.pieceDefinitions.pieces;
    var defIndex = Math.floor(Math.random() * defs.length);

    var newPiece = {
      pos: [4, 0],
      shape: defs[defIndex]
    };

    return newPiece;
  }

  tick() {
    let curPiece = this.state.curPiece;
    if (curPiece) {
      curPiece.pos[1]++;
    } else {
      curPiece = this.createNewPiece();
      
    }

    // Operate on a copy of the array and then queue it with setState
    var pieces = this.state.pieces.slice();
    pieces.push(curPiece);

    this.setState({ 
      curPiece: curPiece,
      pieces: pieces
    });
  }

  createPiecesJSX(pieces) {
    // return value
    var created = [];

    let config = this.state.config;
    let blockWidth = config.blockWidth;
    let blockHeight = config.blockHeight;

    for (var i = 0; i < pieces.length; i++) {
      let curPiece = pieces[i]
      let shape = curPiece.shape;
      let x = curPiece.pos[0];
      let y = curPiece.pos[1];
      created.push(<TetrisPiece key={i} shape={shape} x={x} y={y} blockWidth={blockWidth} blockHeight={blockHeight} />);
    }

    return created;
  }
  
  render() {
    let config = this.state.config;
    let boardMargin = 10;
    let width = config.playspaceWidth;
    let height = config.playspaceHeight;
    let boardWidth = width + boardMargin;
    let boardHeight = height + boardMargin;

    let pieces = this.state.pieces;
    let renderedPieces = this.createPiecesJSX(pieces);

    // <TetrisPiece def={def} x={0} y={0} blockWidth={blockWidth} blockHeight={blockHeight} />
    // TODO: Move <rect> to its own react component
    // TODO: Keep a list of all pieces and render them all.
    return (
      <g>
        <svg width={boardWidth} height={boardHeight}>
          <rect x="0" y="0" width={width} height={height} fill="#888888" />
          {renderedPieces}
        </svg>
      </g>
    );
  }
}

export default TetrisGame;