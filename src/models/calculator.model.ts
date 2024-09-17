/* eslint-disable no-eval */

import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

export class CalculatorModel implements ICalculatorModel {
  private displayValue: string = '';

  public pressNumericKey(key: NumericKeys): void {
    this.displayValue += key;
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this.displayValue += key;
  }

  public pressActionKey(key: ActionKeys): void {
    if (key === ActionKeys.CLEAR) {
      this.displayValue = '';
    } else if (key === ActionKeys.EQUALS) {
      // perform string math(eval not allowed)
      const vals: string[] = this.displayValue.split('');
      const operator: string = vals.find((val: string): boolean => val === '+' || val === '-' || val === '*' || val === '/');
      const operatorIndex: number = vals.indexOf(operator);
      const leftVal: number = parseFloat(vals.slice(0, operatorIndex).join(''));
      const rightVal: number = parseFloat(vals.slice(operatorIndex + 1).join(''));
      let result: number;
      switch (operator) {
        case '+':
          result = leftVal + rightVal;
          break;
        case '-':
          result = leftVal - rightVal;
          break;
        case '*':
          result = leftVal * rightVal;
          break;
        case '/':
          result = leftVal / rightVal;
          break;
        default:
          throw new Error('Invalid operator');
      }
      this.displayValue = result.toString();
    } if (key === ActionKeys.DOT) {
      this.displayValue += '.';
    } else {
      throw new Error('Invalid action key');
    }
  }

  public display(): string {
    return this.displayValue;
  }

}
