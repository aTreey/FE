import React, { Component } from 'react'

class TransitionAnimation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: true,
    }

    this.toToggle = this.toToggle.bind(this)
  }

  render() {
    return (
      <div>
        {/* 通过css 实现动画 */}
        <div className={this.state.isShow ? 'show' : 'hidden'}>react 简单动画实现</div>
        <div>
          <button onClick={this.toToggle}>点击执行动画</button>
        </div>
      </div>
    )
  }

  toToggle() {
    this.setState({ isShow: this.state.isShow ? false : true })
  }
}

export default TransitionAnimation
