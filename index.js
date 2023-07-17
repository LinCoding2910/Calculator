let firstNumber = "";
let secondNumber = "";
let operator = "";

let isPreviousNumber

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
    
    if (!operator) {
        isPreviousNumber = true;
        return firstNumber;
    } else if (secondNumber === "") {
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
		assignEntityOfCaseOne(value);
	} else {
        assignEntityOfCaseTwo(value);
    };
};

const assignEntityOfCaseOne = (item) => {
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

const assignEntityOfCaseTwo = (item) => {
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
    	console.log(firstNumber,operator);
    } else {
        operator = value;
    };
};

const assignValueCaseTwo = (value) => {
    if (isPreviousNumber) {
        firstNumber = value;
    } else if (operator) {
        secondNumber += value;
    } else {
        firstNumber += value;
    };
};

const showResult = () => {
    let display = document.getElementById('content');
    
    display.textContent = operate(operator,firstNumber,secondNumber);
    
    if (display.textContent === "ERROR") {
        firstNumber = "";
    } else {
        firstNumber = display.textContent;
    };
    secondNumber = "";
    operator = "";
    isPreviousNumber = true;
};

const clearEverything = () => {
    let display = document.getElementById('content');    
	display.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
};