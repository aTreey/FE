import React, { PureComponent } from 'react';
import './Game.css';
import '../style.css';

// TODO: 只有props和render 方法，不包含state 可以简化为函数组件

/*
class Square1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => {
          console.log('onClick ---');
          this.props.onClick();
        }}
      >
        {this.props.value}
      </button>
    );
  }
}
*/

function Square(props) {
  const { value, onClick } = props;
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

class Board extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 存储状态数据
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick = (i) => {
    console.log('handleClick=-----');
    const squares = this.state.squares.slice();

    // 有胜出或者已被填充的不做处理
    if (calculateWinner(squares) || squares[i]) {
      console.log('winner ---' + calculateWinner(squares));
      console.log('squares[i] -----' + squares[i]);
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  };

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends PureComponent {
  state = {};
  render() {
    return (
      <div className="game">
        <div div className="game-board">
          <Board></Board>
        </div>
        <div className="game-info">
          <div>{'status'}</div>
          <ol>{'TODO:'}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  console.log('squares ----' + squares);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
