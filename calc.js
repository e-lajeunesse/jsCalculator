window.onload = addListeners;

function addListeners() {
  document.getElementById('displayWindow').addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp() {
  window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
  window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
  var div = document.getElementById('calculator');
  div.style.position = 'absolute';
  div.style.top = e.clientY + 'px';
  div.style.left = e.clientX + 'px';
}

// global variable used to perform the calculations
let num1 = null;
let num2 = null;
let operator = null;
let answer = null;
const operators = ['+', '*', '/', '-'];
let replaceNumber = false;

//function to round to three decimals
function roundThree(number) {
  return Math.round(number * 1000) / 1000;
}

function evaluate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return division(num1, num2);
  }
}

function add(num1, num2) {
  return roundThree(num1 + num2);
}

function subtract(num1, num2) {
  return roundThree(num1 - num2);
}

function multiply(num1, num2) {
  return roundThree(num1 * num2);
}

function division(num1, num2) {
  if (num2 === 0) {
    return 'Unable to divide by zero'
  }
  return roundThree(num1 / num2);
}



const display = document.querySelector('#display');
const clear = document.querySelector('#clear');

//add event listener for clear button that clears display
clear.addEventListener('click', () => {
  display.textContent = 0;
  answer = num1 = num2 = null;
});

//add event listeners for number buttons
const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
  number.addEventListener('click', () => {
    if (operators.includes(display.textContent) || display.textContent === '0') {
      display.textContent = number.textContent;
    }
    else if (replaceNumber) {
      display.textContent = number.textContent;
      replaceNumber = false;
    }
    else {
      display.textContent += number.textContent;
    }
  });
});

//event listener for decimal
let decimalUsed = false;

const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', () => {
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }

});


//add event listeners for operator buttons
const plus = document.querySelector('#plus')
plus.addEventListener('click', () => {
  operator = plus.textContent;
  if (num1 === null) {
    num1 = Number(display.textContent);
    display.textContent = operator;

  }
  else {
    num2 = Number(display.textContent);
    answer = evaluate(num1, num2, operator);
    display.textContent = answer;
    num1 = answer;
    num2 = answer = null;
    replaceNumber = true;
  }
});

const minus = document.querySelector('#minus')
minus.addEventListener('click', () => {
  operator = minus.textContent;
  if (num1 === null) {
    num1 = Number(display.textContent);
    display.textContent = operator;
  }
  else {
    num2 = Number(display.textContent);
    display.textContent = answer = evaluate(num1, num2, operator);
    num1 = answer;
    num2 = null;
    replaceNumber = true;
  }
});

const times = document.querySelector('#times');
times.addEventListener('click', () => {
  operator = times.textContent;
  if (num1 === null) {
    num1 = Number(display.textContent);
    display.textContent = operator;
  }
  else {
    num2 = Number(display.textContent);
    display.textContent = answer = evaluate(num1, num2, operator);
    num1 = answer;
    num2 = null;
    replaceNumber = true;
  }
})

const divide = document.querySelector('#divide');
divide.addEventListener('click', () => {
  operator = divide.textContent;
  if (num1 === null) {
    num1 = Number(display.textContent);
    display.textContent = operator;
  }
  else {
    num2 = Number(display.textContent);
    display.textContent = answer = evaluate(num1, num2, operator);
    num1 = answer;
    num2 = null;
    replaceNumber = true;
  }
})




//add event listener for equals button
const equal = document.querySelector('#equal');
equal.addEventListener('click', () => {
  if (operator === null || num1 === null) {
    display.textContent = 'Error';
  }
  else {
    num2 = Number(display.textContent);
    answer = evaluate(num1, num2, operator);
    display.textContent = answer;
    num1 = num2 = null;
  }
});



