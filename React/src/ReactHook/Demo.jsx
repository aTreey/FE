import React, { PureComponent, useEffect, useState } from 'react'

export class Example extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			count: 0
		}
	}
	render() {
		return (
			<div>
				<p>class 实现: 你点击了{this.state.count}次数</p>
				<button
					onClick={() => {
						this.setState({ count: this.state.count + 1 })
					}}
				>
          点我呀
				</button>
			</div>
		)
	}
}

// Hook 写法
// state 只在组件首次渲染的时候被创建。在下一次重新渲染时，useState 返回给我们当前的 state

export function HookExample() {
	const [count, setCount] = useState(0) // 函数退出后会”消失”

	useEffect(() => {
		console.log('HookExample useEffect-----')
		document.title = `你点击了${count}次`
	}, [count])

	return (
		<div>
			<p>hook 实现: 你点击了{count}次数</p>
			<button
				onClick={() => {
					setCount(count + 1)
				}}
			>
        点我呀
			</button>
		</div>
	)
}

export function Counter(initialCount) {
	const [count, setCount] = useState(initialCount)
	// setState((prevState) => {
	//   return { ...prevState, updateValues };
	// });
	return (
		<>
      Count: {count}
			<button
				onClick={() => {
					setCount(initialCount)
				}}
			>
        重置
			</button>
			<button
				onClick={() => {
					setCount(count - 1)
				}}
			>
        -
			</button>
			<button
				onClick={() => {
					setCount(count - 1)
				}}
			>
        +
			</button>
		</>
	)
}
