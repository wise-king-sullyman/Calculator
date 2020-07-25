let add = (operand1,operand2) => +operand1 + +operand2;
let subtract = (operand1,operand2) => operand1 - operand2;
let multiply = (operand1,operand2) => operand1 * operand2;
let divide = (operand1,operand2) => operand1 / operand2;

let operand1;
let operand2;
let operator;

let display = document.querySelector('#display')
let addToDisplay = (e) => display.textContent += e.target.textContent;

let clearDisplay = () => display.textContent = "";

let clearOps = () => {
    operand1 = "";
    operand2 = "";
    operator = "";
};

let addOperator = (e) => {
    if(operator) {
        operand1 = operate() 
        display.textContent = operand1
    }else {operand1 = display.textContent;}
    addToDisplay(e)
    operator = e.target.textContent;
};

let operate = () => { 
    operand2 = display.textContent.slice(operand1.toString().length+1)
    if(!operand2) {return operand1}
    switch(operator) {
        case "+":
             return add(operand1,operand2);
        case "-":
            return subtract(operand1,operand2);      
        case "x":
            return multiply(operand1,operand2);  
        case "/":
            return divide(operand1,operand2);
        default:
            console.log("ERROR");
    }
}

let handleOperate = () => {
    if(operator) {
        display.textContent = operate();
        clearOps();
    }
}

let operands = document.querySelectorAll('.operand');
operands.forEach(operand => operand.addEventListener("click",addToDisplay));

let operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener("click",addOperator));

let equals = document.querySelector('#equals');
equals.addEventListener("click",handleOperate)

let clear = document.querySelector('#clear');
clear.addEventListener("click", function(){
    clearDisplay()
    clearOps()
})

