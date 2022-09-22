import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'

class KeyframesAnimation extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			isShow: true
		}

		this.toToggle = this.toToggle.bind(this)
	}

	render() {
		return (
			<div>
				<div className={this.state.isShow ? 'keyframesShow' : 'keyframesHide'}>
          关键帧动画demo
				</div>

				<CSSTransition
					in={this.state.isShow} // 是否出现
					timeout={2000} // 执行时间
					classNames="animation-text" // classNames 值
					unmountOnExit // 元素退场时，自动把DOM删除
				>
					<div>react-transition-group 动画库使用</div>
				</CSSTransition>
				<button onClick={this.toToggle}>点击执行动画</button>
			</div>
		)
	}

	toToggle() {
		this.setState({ isShow: this.state.isShow ? false : true })
	}
}

export default KeyframesAnimation
