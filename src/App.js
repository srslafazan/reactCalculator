import React, { Component } from 'react';
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
      <button className="calculator-button" onClick={() => this.props.resolver(this.value)}>
        {this.value}
      </button>
    )
  }
}


class App extends Component {

  constructor(props) {
    super(props)
    this.digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    this.options = ['clear', '=']
    this.operators = ['+','-', '*', '/']

    this.state = {
      input: '',
      operator: null,
      calculated: null,
    }

    this.calculate = this.calculate.bind(this)
    this.optionResolver = this.optionResolver.bind(this)
    this.digitResolver = this.digitResolver.bind(this)
    this.operatorResolver = this.operatorResolver.bind(this)
    this.displayValue = this.displayValue.bind(this)
  }

  calculate() {
    const { input, operator, calculated } = this.state
    if (!operator) return

    const newCalculated = operatorMap[operator](calculated, input)
    console.log(`Set calculated to ${newCalculated}`)

    this.setState({
      input: '',
      calculated: newCalculated,
      operator: null,
    })
  }


  optionResolver(option) {
    console.log(`Running input option, ${option}.`)
    switch(option) {

      case 'clear':
        this.setState({ input: '', calculated: null, operator: null })
        break;

      case '=':
        if (!this.state.operator) {
          this.setState({ calculated: parseFloat(this.state.input), input: '' })
        } else {
          this.calculate()
        }
        break;

      default: return
    }
  }

  digitResolver(digit) {
    const input = this.state.input + digit
    console.log(`Pushing input digit ${digit}.`)
    this.setState({ input })
  }

  operatorResolver(operator) {
    const { input, calculated } = this.state
    console.log(`Set input operator to ${operator}.`)

    this.setState({ operator })

    if (!calculated) {
      return this.setState({
        calculated: parseFloat(input),
        input: '',
      })
    }

    if (input && operator) {
      this.calculate()
      this.setState({ operator })
    }
  }

  displayValue() {
    const { input, calculated } = this.state
    const display = input || calculated || 0
    return (
      <h1 className="display">
        {display}
      </h1>
    )
  }

  render() {
    return (
      <div className="App">

        {this.displayValue()}

        <div className="options">
          {this.options.map((option, index) => (<Button key={index} value={option} resolver={this.optionResolver} />))}
        </div>

        <div className="digits">
          {this.digits.map((digit, index) => (<Button key={index} value={digit} resolver={this.digitResolver} />))}
        </div>

        <div className="operators">
          {this.operators.map((operator, index) => (<Button key={index} value={operator} resolver={this.operatorResolver} />))}
        </div>

        <h1 className="title">React Calculator</h1>

      </div>
    );
  }
}

export default App;
