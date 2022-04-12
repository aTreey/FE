import React, { PureComponent } from 'react'
import './Game.css'

class Square extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return <button className="square">{this.props.value}</button>
  }
}

class Board extends PureComponent {
  renderSquare(i) {
    return <Square value={i} />
  }

  render() {
    const status = 'Next player: X'
    return (
      <div>
        <div className="status">{status}</div>
        <div></div>
      </div>
    )
  }
}

export default class Game extends PureComponent {
  state = {}
  render() {
    return <div className="game">游戏</div>
  }
}
