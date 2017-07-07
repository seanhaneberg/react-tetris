import React, { Component } from 'react';
import TetrisPiece from './TetrisPiece.jsx';

class PieceDefinitions {
  constructor() {
    this.pieces = [
      [
        [[1, 0], [1, 1], [1, 2], [1, 3]],
        [[0, 1], [1, 1], [2, 1], [3, 1]]
      ], // I piece rotations
      [
        [[1, 0], [1, 1], [1, 2], [2, 2]],
        [[0, 1], [1, 1], [1, 2], [1, 0]],
        [[1, 2], [1, 1], [1, 0], [0, 0]],
        [[0, 1], [1, 1], [0, 2], [2, 1]]
      ],   // [1] L
      [
        [[0, 0], [1, 0], [0, 1], [0, 2]],
        [[0, 0], [1, 0], [0, 1], [0, 2]],
        [[0, 0], [1, 0], [0, 1], [0, 2]],
        [[0, 0], [1, 0], [0, 1], [0, 2]]
      ],   // [2] R (mirror of L)
      [
        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[0, 0], [1, 0], [1, 1], [2, 1]]
      ],   // [3] Z
      [
        [[0, 0], [0, 1], [1, 1], [1, 2]],
        [[0, 0], [0, 1], [1, 1], [1, 2]]
      ],   // [4] S (mirror of Z)
      [
        [[0, 0], [0, 1], [1, 0], [1, 1]]
      ],   // [5] X
      [
        [[1, 0], [1, 1], [1, 2], [0, 1]],
        [[0, 1], [1, 1], [2, 1], [1, 0]],
        [[1, 0], [1, 1], [1, 2], [2, 1]],
        [[0, 1], [1, 1], [1, 0], [1, 2]]
      ]    // [6] T
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

    this.piecePallet = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
    ];

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
        if (self.state && !self.state.gameOver) {
          self.tick();
        }
      },
      250);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  createNewPiece() {
    let defs = this.state.pieceDefinitions.pieces;
    let piecePallet = this.state.config.piecePallet;
    var defIndex = Math.floor(Math.random() * defs.length);
    var rotation = Math.floor(Math.random() * defs[defIndex].length);
    let colorIndex = Math.floor(Math.random() * piecePallet.length);

    var newPiece = {
      color: piecePallet[colorIndex],
      pos: { x: 4, y: 0 },
      shape: defs[defIndex][rotation]
    };

    return newPiece;
  }

  isBoardPosClear(pos) {
    let x = pos.x;
    let y = pos.y

    // check bounds
    if (x < 0 || x > this.props.cols || y < 0 || y >= this.props.rows) {
      return false;
      // todo shapes
    } else {
      return true;
    }
  }

  getOccupyingPiece(pos) {
    var occupier = null; 
    for (var i in this.state.pieces) {
      let piece = this.state.pieces[i];
      let basePos = piece.pos;
      for (var j in piece.shape) {
        let part = piece.shape[j];
        let x = basePos.x + part[0];
        let y = basePos.y + part[1];

        if (pos.x === x && pos.y === y) {
          occupier = piece;
          break;
        }

      }

      // If the inner-loop sets occupier, there's no more work to do.
      if (occupier) {
        break;
      }
    }

    return occupier;
  }

  checkDown(piece) {
    var clear = true;
    var basePos = piece.pos;

    for (var i = 0; i < piece.shape.length; i++) {

      var pos = {
        x: basePos.x + piece.shape[i][0],
        y: basePos.y + piece.shape[i][1] + 1
      };

      if (!this.isBoardPosClear(pos)) {
        clear = false;
        break;
      }

      let occupier = this.getOccupyingPiece(pos);
      if (occupier !== null && occupier !== piece) {
        // If some other piece already occupied that space, we're not clear.
        clear = false;
        break;
      }

    }

    return clear;
  }


  tick() {
    let curPiece = this.state.curPiece;
    if (curPiece && this.checkDown(curPiece)) {
      curPiece.pos.y++;
    } else {
      curPiece = this.createNewPiece();
      if (!this.checkDown(curPiece)) { 
        // game over!
        this.setState({ gameOver: true });
      }
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
      let curPiece = pieces[i];
      let shape = curPiece.shape;
      let x = curPiece.pos.x;
      let y = curPiece.pos.y;
      let stroke = "#000000";
      let fill = curPiece.color;
      created.push(<TetrisPiece   key={i} 
                                  shape={shape} 
                                  x={x} 
                                  y={y} 
                                  blockWidth={blockWidth} 
                                  blockHeight={blockHeight} 
                                  stroke={stroke}
                                  fill={fill}
                                  />
                                  );
    }

    return created;
  }

  render() {
    let config = this.state.config;
    let boardMargin = 20;
    let width = config.playspaceWidth;
    let height = config.playspaceHeight;
    let boardWidth = width + boardMargin;
    let boardHeight = height + boardMargin;

    let pieces = this.state.pieces;
    let renderedPieces = this.createPiecesJSX(pieces);

    let board = <rect x="0" y="0" width={width} height={height} fill="#888888" />;
    let gameOver = this.state.gameOver ? <p> GAME OVER </p> : <p></p>;

    return (
      <g>
        {gameOver}
        <svg width={boardWidth} height={boardHeight}>
          {board}
          {renderedPieces}
        </svg>
      </g>
    );
  }
}

export default TetrisGame;