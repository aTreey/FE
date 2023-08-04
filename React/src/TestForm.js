import React, { PureComponent } from 'react'

class FormDemo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      userName: '',
      gender: 'main',
      checked: true,
    }

    this.submitHandler = this.submitHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  submitHandler() {}

  handleChange(event) {
    console.log('=============handleChange=======================')
    console.log(event)
    console.log('====================================')

    const target = event.target
    const value = target.value === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>情输入您的姓名：</label>
          <input
            // id="userName"
            type='text'
            name='userName'
            placeholder='请输入姓名'
            onChange={this.handleChange}
            value={this.state.userName}
          ></input>
          <br />
          <label htmlFor='checkbox'>是或否: </label>
          <input
            id='checkbox'
            name='checkbox'
            type='checkbox'
            onChange={this.handleChange}
            checked={this.state.checked}
          ></input>
          {/* <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} /> */}
          <br />

          {/*<label htmlFor="username">请选择：</label>
          <select
            name="gender"
            // onChange={(event)=>{this.handleChange3(3, event)}}
            value={this.state.gender}
          >
            <option value="man">帅哥</option>
            <option value="woman">美女</option>
          </select> */}
          <br />
          <p>
            <button type='submit'>提交</button>
          </p>
        </form>
      </div>
    )
  }
}

export default FormDemo
