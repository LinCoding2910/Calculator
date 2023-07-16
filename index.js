let firstNumber = "";
let secondNumber = "";
let operator = "";

let isPreviousNumber = "";

const add = (a,b) => {return a + b};

const subtract = (a,b) => {return a - b};

const multiply = (a,b) => {return a * b};

const divide = (a, b) => {
    if (b === 0) return ("ERROR");
    const result =  a / b;
    const decimalPlaces = result.toString().split('.')[1];
  
    if (decimalPlaces && decimalPlaces.length > 5) {
      return result.toFixed(10);
    } else if (decimalPlaces) {
      return result.toString();
    } else {
      return result.toFixed(0);
    }
  };
  

const operate = (operator,firstInt,secondInt) => {
    let firstNumber = parseFloat(firstInt);
    let secondNumber = parseFloat(secondInt);
    
    if (!secondNumber && !operator) {
        isPreviousNumber = 1;
        return firstNumber;
    } else if (secondNumber === "") {
        isPreviousNumber = 1;
        return "ERROR";
    }

    switch(operator) {
        case "+": 
            return add(firstNumber,secondNumber);
        case "-":
            return subtract(firstNumber,secondNumber);
        case "*":
            return multiply(firstNumber,secondNumber);
        case "/":
            return divide(firstNumber,secondNumber);
        default: 
            return "error";
    }
};

const changeDisplay = (value) => {
    let display = document.getElementById('content');

    let numberPattern = /\d+/;
    let mathSignPattern = /[\+\-\*\/]/;

    if (firstNumber && secondNumber && operator) {
        if (mathSignPattern.test(value)) {
            firstNumber = operate(operator,firstNumber,secondNumber); 
            secondNumber = "";
            operator = value;
			console.log(firstNumber,operator);
        } else {
            secondNumber += value;
            console.log(secondNumber);
        };
    } else if (firstNumber !== '' && operator) {
        secondNumber += value;
        console.log(secondNumber);
    } else {
        if (isPreviousNumber) {
            if (numberPattern.test(value)) {
                firstNumber = value;
                console.log(firstNumber);
            } else {
                operator += value;
                console.log(operator);
            }; 
        } else {
            if (numberPattern.test(value)) {
                firstNumber += value;
                console.log(firstNumber);
            } else {
                operator += value;
                console.log(operator);
            };    
        };   
    };

    if (isPreviousNumber) {
        if (firstNumber && operator) {
            if (value === "*") {
                display.textContent += "\u00D7"
            } else if (value === "/") {
                display.textContent += "\u00F7"   
            } else {
                display.textContent += value;
            };
        } else {
            if (numberPattern.test(value)) {
                display.textContent = value;
                isPreviousNumber = 0;
            } else if (value === "*") {
                display.textContent += "\u00D7"
            } else if (value === "/") {
                display.textContent += "\u00F7"   
            } else {
                display.textContent += value;
            };        
        }
    } else {
        if (value === "*") {
            display.textContent += "\u00D7"
        } else if (value === "/") {
            display.textContent += "\u00F7"   
        } else {
            display.textContent += value;    
        };    
    };
};

const showResult = () => {
    let display = document.getElementById('content');
    display.textContent = operate(operator,firstNumber,secondNumber);
    if (display.textContent === "ERROR") {
        firstNumber = "";
    } else {
        firstNumber = display.textContent;
    }
    secondNumber = "";
    operator = "";
    isPreviousNumber = 1;
};

const clearEverything = () => {
    let display = document.getElementById('content');    display.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
};






// store the value first if user no press equals
