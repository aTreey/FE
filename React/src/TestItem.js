import React, { PureComponent } from 'react'
// 校验传旨
import PropTypes from 'prop-types'

class TestItem extends PureComponent {
  constructor(props) {
    super(props)
    console.log('TestItem 组件初始化----')
    // 在构造函数中bind，便于性能优化
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillUnmount() {
    console.log('TestItem 组件 componentWillUnmount----')
  }

  // componentWillReceiveProps() {
  //   // console.log("TestItem 组件 -componentWillReceiveProps ---- " + JSON.stringify(this.props));
  // }

  // 使用 Component 才会触发无用的渲染，使用PureComponent
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.content !== this.props.content) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    console.log('-------TestItem ------render')
    return (
      <li onClick={this.handleClick}>
        {this.props.prefix} - {this.props.content} - {this.props.suffix}
      </li>
    )
  }

  handleClick() {
    // /// dangerouslySetInnerHTML不符合单项数据流 ////
    // this.props.list = [];

    console.log('handleClick ---删除了--' + this.props.index)
    // 调用父组件的删除方法来删除，不能操作数据
    this.props.deleteItem(this.props.index)
  }
}

// 使用PropTypes校验传递值
TestItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  deleteItem: PropTypes.func,
  prefix: PropTypes.string.isRequired, // 必须传值的属性，不传回报错
  suffix: PropTypes.string,
}

TestItem.defaultProps = {
  suffix: 'Demo',
}

export default TestItem
