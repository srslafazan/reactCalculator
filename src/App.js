import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const operatorMap = {
  '+': (a, b) => (parseFloat(a) + parseFloat(b)),
  '-': (a, b) => (parseFloat(a) - parseFloat(b)),
  '/': (a, b) => (parseFloat(a) / parseFloat(b)),
  '*': (a, b) => (parseFloat(a) * parseFloat(b)),
}


class Button extends Component {
  constructor(props) {
    super(props)
    this.value = props.value
  }

  render() {
    return (
      <button onClick={() => this.props.resolver(this.value)}>
        {this.value}
      </button>
    )
  }

}


class App extends Component {

  constructor(props) {
    super(props)
    this.digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.']
    this.options = ['clear', '=']
    this.operators = ['+','-', '*', '/']
    this.value = 0

    this.state = {
      queue: [],
      operator: null,
    }

    this.calculate = this.calculate.bind(this)
    this.optionResolver = this.optionResolver.bind(this)
    this.digitResolver = this.digitResolver.bind(this)
    this.operatorResolver = this.operatorResolver.bind(this)
    this.displayValue = this.displayValue.bind(this)
  }

  calculate() {
    const { queue, operator, value } = this.state
    if (!operator) return
    const newValue = operatorMap[operator](queue.first, queue.last)

    console.log(`Set first to ${newValue.toString()} and set value to ${newValue}`)

    this.setState({
      queue: {
        first: newValue.toString(),
        last: '',
      },
      value: newValue,
      operator: null,
    })
  }


  optionResolver(option) {
    console.log(`Running current option, ${option}.`)
    switch(option) {
      case 'clear':
      this.setState({ queue: { first: '', last: ''}, value: 0, operator: null })
        break;
      case '=':
        this.calculate()
        break;
    }
  }

  digitResolver(digit) {
    const { queue, operator, value } = this.state
    const newQueue = Object.assign({}, queue)

    console.log(`Pushing digit ${digit} to queue.`)

    if (!operator) {
      if (!newQueue.first) {

        // TODO - prevent multiple "." characters
        newQueue.first = digit.toString()
      } else {
        newQueue.first += digit.toString()
      }
    } else {
      if (!newQueue.last) {
        // TODO - prevent multiple "." characters
        newQueue.last = digit.toString()
      } else {
        newQueue.last += digit.toString()
      }
    }
    console.log(newQueue)
    this.setState({ queue: newQueue })
  }


  operatorResolver(operator) {
    const { queue } = this.state
    console.log(`Set current operator to ${operator}.`)
    console.log('last', this.last)
    this.setState({ operator })
    if (queue.last) {
      console.log(`Calculate with ${operator}.`)
      this.calculate()
    }
  }

  displayValue() {
    const { queue, value } = this.state
    return queue.last || queue.first || value || 0
  }

  render() {
    return (
      <div className="App">

        {this.options.map((option, index) => (<Button key={index} value={option} resolver={this.optionResolver} />))}

        {this.digits.map((digit, index) => (<Button key={index} value={digit} resolver={this.digitResolver} />))}

        {this.operators.map((operator, index) => (<Button key={index} value={operator} resolver={this.operatorResolver} />))}

        {this.displayValue()}

      </div>
    );
  }
}

export default App;
