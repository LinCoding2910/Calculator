let firstNumber = "";
let secondNumber = "";
let operator = "";

let isPreviousNumber;
let lastVariableChanged = [];

let display = document.getElementById('content');

const add = (a,b) => a + b;

const subtract = (a,b) =>  a - b;

const multiply = (a,b) =>  a * b;

const divide = (a, b) => {
    if (b === 0) return ("ERROR: Can't be divided by Zero!");
    return a / b;
};
  

const operate = (operator,firstInt,secondInt) => {
    let firstNumber = parseFloat(firstInt);
    let secondNumber = parseFloat(secondInt);
    
    if (!firstNumber) {
        return "";
    } else if (!operator) {
        isPreviousNumber = true;
        return firstNumber;
    } else if (!secondNumber) {
        isPreviousNumber = true;
        return "ERROR: Incomplete Equation!";
    };

	let operations = {
		"+" : add,
		"-" : subtract,
		"*" : multiply,
		"/" : divide,
	};

	return operations[operator](firstNumber,secondNumber);
};

const changeDisplay = (value) => {
    changeValueOfVariables(value);
	
	if (isPreviousNumber) {
		assignEntityCaseOne(value);
	} else {
        assignEntityCaseTwo(value);
    };
};

const assignEntityCaseOne = (item) => {
    let numberPattern = /\d+/;
    let multiplyAndDivide = /[\/*]/;

    let mathSymbols = {
        "*" : "\u00D7",
        "/" : "\u00F7"
    };

    if (numberPattern.test(item)) {
        display.textContent = item;
    } else {
        multiplyAndDivide.test(item) ? display.textContent += mathSymbols[item] : display.textContent += item;
    };
        
    isPreviousNumber = false;
};

const assignEntityCaseTwo = (item) => {
    let multiplyAndDivide = /[\/*]/;

    let mathSymbols = {
        "*" : "\u00D7",
        "/" : "\u00F7"
    };

    multiplyAndDivide.test(item) ? display.textContent += mathSymbols[item] : display.textContent += item;
};

let changeValueOfVariables = (value) => {
    let mathSignPattern = /[\+\-\*\/]/;

    mathSignPattern.test(value) ? assignValueCaseOne(value) : assignValueCaseTwo(value);
};

const assignValueCaseOne = (value) => {
    if (firstNumber !== "" && secondNumber !== "" && operator) {
        firstNumber = operate(operator,firstNumber,secondNumber);
        secondNumber = "";
    	operator = value;
        
        lastVariableChanged.splice(0, lastVariableChanged.length, 1, 3);
    } else {
        operator = value;
        
        lastVariableChanged.push(3);
    };
};

const assignValueCaseTwo = (value) => {
    if (isPreviousNumber) {
        firstNumber = value;
        
        lastVariableChanged.splice(0, lastVariableChanged.length, 1);
    } else if (operator) {
        secondNumber += value;

        lastVariableChanged.push(2);
    } else {
        firstNumber += value;

        lastVariableChanged.push(1);
    };
};

const showResult = () => {
    display.textContent = operate(operator,firstNumber,secondNumber);
    
    if (display.textContent === "ERROR") {
        firstNumber = "";
        lastVariableChanged.length = 0;
    } else {
        firstNumber = display.textContent;
        lastVariableChanged.splice(0, lastVariableChanged.length, 1);
    };
    secondNumber = "";
    operator = "";
    isPreviousNumber = true;
};

const clearEverything = () => {
	display.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    lastVariableChanged.length = 0;
};

const backspace = () => {
    display.textContent = display.textContent.slice(0, -1);    
    let variableToChange = lastVariableChanged.pop(); 
    if (variableToChange === 1) {
        firstNumber = firstNumber.slice(0, -1);
    } else if (variableToChange === 2) {
        secondNumber = secondNumber.slice(0, -1);
    } else {
        operator = operator.slice(0, -1);
    }
};