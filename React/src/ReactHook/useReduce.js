import React, { useReducer } from 'react'

/**
 * useReducer 是useState的一个封装
 */

// 初始值：0
const initialCountState = 0

/**
 *  reducer 的第一个参数，输入旧的 state 根据 action 返回新的 state，这就是reducer的作用
 * @param {*} state 输入的state
 * @param {*} action 根据action 返回新的值
 * @returns
 */
function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return { count: action.payload }
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
  }
}

/**
 * useReducer 第三个参数，输入初始的 state 输出一个新的state
 * @param {*} initialCountState
 * @returns
 */
function init(initialCountState) {
  console.log('🚀 ~ file: useReduce.js:30 ~ init ~ initialCountState:', initialCountState)
  return { count: initialCountState.count + 1 }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init)

  return (
    <React.Fragment>
      Count: {state.count}
      <button
        onClick={() =>
          dispatch({
            type: 'reset',
            payload: initialCount.count,
          })
        }
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}> + </button>
      <button onClick={() => dispatch({ type: 'decrement' })}> - </button>
    </React.Fragment>
  )
}

const UseReducerDemo = (props) => (
  <div>
    <h3>useReducer 使用</h3>
    <Counter initialCount={{ count: 1 }}></Counter>
  </div>
)

export { UseReducerDemo }
