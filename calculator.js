let firstNumber = "";
let secondNumber = "";
let operator = "";

let isPreviousNumber;
let negativeNumberEffect = false;
let lastVariableChanged = [];
let previousValueLength = 1;

const mathSignDisplay = new RegExp("[+\\-\u00F7\u00D7]");
const mathSignPattern = /[+\-*/]/;
const multiplyAndDivide = /[*/]/;
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00'];
const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '+', '-', '/'];

let display = document.getElementById('content');
let shorcutDisplay = document.getElementById('shorcut-key-display');

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (a === 0 && b === 0) return ("Undefined"); 
    else if (b === 0) return ("Infinity"); 
    else return (a / b);
};


const operate = (operator, firstInt, secondInt) => {
    if (firstNumber === "") {
        return "";
    } else if (!operator) {
        isPreviousNumber = true;
        return firstNumber;
    } else if (secondNumber === "" || secondNumber === ".") {
        isPreviousNumber = true;
        return "ERROR: Incomplete Equation!";
    };

    firstNumber = parseInt(firstInt);
    secondNumber = parseInt(secondInt);

    let operations = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide,
    };
    
    return operations[operator](firstNumber, secondNumber);
};

const modifyDisplayAndVariables = (value) => {
    if (checkValue(value)) return;

    changeValueOfVariables(value);

    changeDisplay(value);
    
    isPreviousNumber = false;
};

const checkValue = (value) => {
    if (numbers.includes(value)) return;
    if (firstNumber === "-" || firstNumber === "." || secondNumber === "-" || secondNumber === ".") {
        return true;
    } else if ( display.textContent === "Undefined" || display.textContent === "Infinity" || display.textContent === "ERROR: Incomplete Equation!") {
        display.textContent = "";
        return true;
    }
     else if (firstNumber === ""){
        if (value === "-") {
            return;
        } else {
            return true;
        }
    };
};

const changeDisplay = (item) => {
    if (negativeNumberEffect) {
        assignEntityCaseOne(item);
    } else if (mathSignPattern.test(item)) {
        assignEntityCaseTwo(item);
    } else if (isPreviousNumber) {
        assignEntityCaseThree(item);
    } else {
        assignEntityCaseFour(item);
    };
};

const assignEntityCaseOne = (item) => {
    if (operator === "+") {
        display.textContent = display.textContent.slice(0, -1);
        display.textContent += "+";
    } else {
        display.textContent += item;
    }
    negativeNumberEffect = false;
};

const assignEntityCaseTwo = (item) => {
    let mathSymbols = {
        "*": "\u00D7",
        "/": "\u00F7"
    };
    let lastCharacter = display.textContent.slice(-1);

    if (mathSignDisplay.test(lastCharacter)) display.textContent = display.textContent.slice(0, -1);

    multiplyAndDivide.test(item) ? display.textContent += mathSymbols[item] : display.textContent += item;
};

const assignEntityCaseThree = (item) => {
    display.textContent = item;
    isPreviousNumber = false;
};

const assignEntityCaseFour = (item) => {
    let lastCharacter = display.textContent.slice(-1);
    let lastSecondCharacter = display.textContent.slice(-2, -1);

    display.textContent = (lastSecondCharacter === "" || mathSignDisplay.test(lastSecondCharacter))
        ? (lastCharacter === "0" ? display.textContent.slice(0, -1) + item : display.textContent + item)
        : display.textContent + item;
};

let changeValueOfVariables = (value) => {
    if (value === "-") {
        assignValueCaseOne(value);
    } else {
        mathSignPattern.test(value) ? assignValueCaseTwo(value) : assignValueCaseThree(value);
    };
};

const assignValueCaseOne = (value) => {
    if (operator === "-") {
        operator = "+";
        negativeNumberEffect = true;
    } else if (operator === "+") {
        operator = "-";
    } else if (firstNumber !== "" && secondNumber === "" && operator) {
        secondNumber += value;
        negativeNumberEffect = true;
        lastVariableChanged.push(2);
    } else if (firstNumber === "") {
        firstNumber = value;
        isPreviousNumber = false;
        console.log("Hi")
        lastVariableChanged.push(1);
    } else {
        assignValueCaseTwo(value);
    };
};

const assignValueCaseTwo = (value) => {
    if (firstNumber !== "" && secondNumber !== "" && operator) {
        firstNumber = operate(operator, firstNumber, secondNumber);
        secondNumber = "";
        operator = value;
        lastVariableChanged.splice(0, lastVariableChanged.length, 1, 3);
    } else {
        operator = value;
        lastVariableChanged.push(3);
    };
};

const assignValueCaseThree = (value) => {
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
    display.textContent = operate(operator, firstNumber, secondNumber)

    if (display.textContent === "Undefined" || display.textContent === "Infinity" || display.textContent === "ERROR: Incomplete Equation!") {
        firstNumber = "";
        console.log("hi");
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
    };
};

const addDecimalPoint = () => {
    let lastCharacter = display.textContent.slice(-1);

    if (isPreviousNumber) {
        display.textContent = ".";
        firstNumber = ".";
        isPreviousNumber = false;
        console.log("Adding decimal point to start a new number");
    } else if (!operator && !firstNumber.includes(".")) {
        display.textContent += ".";
        firstNumber += ".";
        console.log("Adding decimal point to firstNumber");
    } else if (operator && !secondNumber.includes(".")) {
        display.textContent += ".";
        secondNumber += ".";
        console.log("Adding decimal point to secondNumber");
    }
};



document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Enter') {
        showResult();
    } else if (event.key === 'c') {
        clearEverything();
    } else if (event.key === '.') {
        addDecimalPoint();
    } else if (allowedKeys.includes(event.key)) {
        modifyDisplayAndVariables(event.key);
    };
});

const showShorcutKey = (value) => {
    shorcutDisplay.textContent = shorcutDisplay.textContent.slice(0, -previousValueLength);
    shorcutDisplay.textContent += value;
    previousValueLength = value.length;
}; 