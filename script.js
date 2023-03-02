// Get references to the calculator screen and buttons
const calculatorScreen = document.querySelector('.calculator-screen');
const calculatorButtons = document.querySelectorAll('.calculator-button');

// Initialize variables for the first and second operands, the current operation, and whether the screen should be reset
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

// Function to handle input of digits
function inputDigit(digit) {
  // Reset the screen if necessary
  if (shouldResetScreen) {
    calculatorScreen.value = '';
    shouldResetScreen = false;
  }
  // Append the digit to the screen value
  calculatorScreen.value += digit;
}

// Function to handle input of decimal point
function inputDecimal() {
  // Reset the screen if necessary
  if (shouldResetScreen) {
    calculatorScreen.value = '';
    shouldResetScreen = false;
  }
  // Add a leading 0 if the screen value is empty
  if (calculatorScreen.value === '') {
    calculatorScreen.value = '0';
  }
  // Add a decimal point if there isn't one already
  if (!calculatorScreen.value.includes('.')) {
    calculatorScreen.value += '.';
  }
}

// Function to handle operator button clicks
function handleOperator(operator) {
  // Parse the screen value as a float
  const inputValue = parseFloat(calculatorScreen.value);
  // If there's already a current operation, perform it with the current and previous operands
  if (currentOperation !== null) {
    if (secondOperand === '') {
      secondOperand = inputValue;
    } else {
      const result = calculate();
      firstOperand = result;
      secondOperand = '';
      calculatorScreen.value = result;
    }
  } else {
    // Otherwise, store the current operand as the first operand
    firstOperand = inputValue;
  }
  // Set the current operation to the clicked operator and reset the screen
  currentOperation = operator;
  shouldResetScreen = true;
}

// Function to perform the current operation
function calculate() {
  const first = parseFloat(firstOperand);
  const second = parseFloat(secondOperand);
  if (isNaN(first) || isNaN(second)) return '';
  switch (currentOperation) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return first / second;
    case '%':
      return first % second;
    default:
      return '';
  }
}

// Function to calculate the square root of the screen value
function squareRoot() {
  const inputValue = parseFloat(calculatorScreen.value);
  if (inputValue < 0) {
    calculatorScreen.value = 'Error';
    return;
  }
  const result = Math.sqrt(inputValue);
  calculatorScreen.value = result;
}

// Function to calculate the square of the screen value
function square() {
  const inputValue = parseFloat(calculatorScreen.value);
  const result = inputValue * inputValue;
  calculatorScreen.value = result;
}

// Function to clear the screen and reset variables
function clearScreen() {
  calculatorScreen.value = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
  shouldResetScreen = false;
}

// Initialize the calculator by adding click event listeners to the buttons
function init() {
  calculatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('operator')) {
        handleOperator(button.value);
        return;
      }
      if (button.classList.contains('decimal')) {
        inputDecimal();
        return;
      }}
