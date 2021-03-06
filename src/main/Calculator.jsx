import React, { Component } from 'react';
import './Calculator.css';

import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);

    this.state = { ...initialState };
  }

  setOperation(op) {
    const operation = op.target.innerText;
    const { current } = this.state;
    if (current === 0) {
      this.setState({
        operation,
        current: 1,
        clearDisplay: true,
      });
    } else {
      const equals = operation === '=';
      const { operation: currentOperation, values } = this.state;
      switch (currentOperation) {
        case '/':
          values[0] /= values[1];
          break;
        case '*':
          values[0] *= values[1];
          break;
        case '-':
          values[0] -= values[1];
          break;
        default:
          values[0] += values[1];
          break;
      }

      if (Number.isNaN(values[0]) || !Number.isFinite(values[0])) {
        this.clearMemory();
        return;
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0].toString(),
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    const number = n.target.innerText;
    let { displayValue, clearDisplay } = this.state;

    if (n.target.innerText === '.' && displayValue.includes('.')) {
      return null;
    }

    clearDisplay = displayValue === '0' || clearDisplay;
    const currentValue = clearDisplay ? '' : displayValue;
    displayValue = currentValue + number;

    this.setState({ displayValue, clearDisplay: false });

    if (number !== '.') {
      const { current, values } = this.state;
      const newValue = parseFloat(displayValue);
      const newValues = [...values];

      newValues[current] = newValue;
      this.setState({ values: newValues });
    }

    return null;
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  render() {
    const { displayValue } = this.state;
    return (
      <div className="calculator">
        <Display value={displayValue} />
        <Button label="AC" triple="triple" click={() => this.clearMemory} />
        <Button label="/" operation="operation" click={() => this.setOperation} />
        <Button label="7" click={() => this.addDigit} />
        <Button label="8" click={() => this.addDigit} />
        <Button label="9" click={() => this.addDigit} />
        <Button label="*" operation="operation" click={() => this.setOperation} />
        <Button label="4" click={() => this.addDigit} />
        <Button label="5" click={() => this.addDigit} />
        <Button label="6" click={() => this.addDigit} />
        <Button label="-" operation="operation" click={() => this.setOperation} />
        <Button label="1" click={() => this.addDigit} />
        <Button label="2" click={() => this.addDigit} />
        <Button label="3" click={() => this.addDigit} />
        <Button label="+" operation="operation" click={() => this.setOperation} />
        <Button label="0" double="double" click={() => this.addDigit} />
        <Button label="." click={() => this.addDigit} />
        <Button label="=" operation="operation" click={() => this.setOperation} />
      </div>
    );
  }
}
