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

// TODO: 替换为函数组件
class Board extends PureComponent {
  // TODO: 状态提升到Game组件中

  /*
  constructor(props) {
    super(props);
    this.state = {
      // 存储状态数据
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  // TODO: 数据修改提升到Game 中
  handleClick(i) {
    console.log('Square onClick-----');
    const squares = this.state.squares.slice();
    // 有胜出或者已被填充的不做处理
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }
  */

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.props.squares);
    console.log('winner ---' + winner);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.props.xIsNext ? 'X' : 'O'}`;
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
  constructor(props) {
    super(props);
    this.state = {
      // TODO: 想要在Game组件展示一个历史步骤列表，所以把history 这个state放在顶层Game组件中；
      // 把 state 提升到顶层Game 组件里，1. 有了对Board 组件数据的完全控制权；2. 可以让Game 组件控制Board 组件，并根据history渲染 历史步骤
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true
    };
  }

  handleClick(i) {
    console.log('Game handleClick=-----');
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // 有胜出或者已被填充的不做处理
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    /*
    concat() 方法可能与push()不太一样，它并不会改变原数组，所以我们推荐使用 concat()。
    */
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    // 使用最新一次历史记录来确定并展示当前状态
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = `Game Winner: ${winner}`;
    } else {
      status = `Game Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div div className="game-board">
          <Board
            squares={current.squares}
            xIsNext={true}
            onClick={(i) => {
              this.handleClick(i);
            }}
          ></Board>
        </div>
        <div className="game-info">
          <div>{status}</div>
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
