import React, { useContext } from 'react'
import { myContext } from './useReducerContext'

function CounterTest() {
  const { state, dispatch } = useContext(myContext)

  return (
    <React.Fragment>
      CounterTest count: {state.count}
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}> + </button>
      <button onClick={() => dispatch({ type: 'decrement' })}> - </button>
    </React.Fragment>
  )
}

export default CounterTest
