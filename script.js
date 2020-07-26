let add = (operand1,operand2) => +operand1 + +operand2;
let subtract = (operand1,operand2) => operand1 - operand2;
let multiply = (operand1,operand2) => operand1 * operand2;
let divide = (operand1,operand2) => operand1 / operand2;

let operandKeys = [00,0,1,2,3,4,5,6,7,8,9,"."]
let operatorKeys = ["+","-","/","*"]
let operand1;
let operand2;
let operator;

let display = document.querySelector('#display')

let checkForDecimal = (e) => {
    let decimalLocation = display.textContent.lastIndexOf(".");
    if(e.target.textContent == "." &&
     decimalLocation > -1 &&
    (!operand1 || decimalLocation > operand1.length)){
        return 1;
    };
};

let addToDisplay = (e) => {
    if(checkForDecimal(e)){return;}
    if(display.textContent.length > 12){return;}
    display.textContent += e.target.textContent;
};

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
    operator = e.target.id;
};

let operate = () => { 
    operand2 = display.textContent.slice(operand1.toString().length+1)
    if(!operand2) {return operand1}
    switch(operator) {
        case "+":
             return add(operand1,operand2);
        case "-":
            return subtract(operand1,operand2);      
        case "*":
            return multiply(operand1,operand2);  
        case "/":
            return divide(operand1,operand2);
        default:
            console.log("ERROR");
    }
}

let handleOperate = () => {
    if(operator) {
        let operationResult = operate();
        if(operationResult == "Infinity"){
            alert("No Breaking the Universe Allowed! (Can't Divide by 0")
            clearDisplay()
            clearOps()
            return
        }
        if(operationResult.toString().length > 12){
            display.textContent = operationResult.toFixed(12);
            clearOps()
            return
        }
        display.textContent = operationResult;
        clearOps();
    }
}

let itemInArray = (targetItem,array) => array.find(item => item == targetItem);

let clickKey = id => document.getElementById(id).click();

let logKey = (e) => {
    e.preventDefault();
    let key = e.key;
    if(itemInArray(key,operandKeys)){clickKey(key)};
    if(itemInArray(key,operatorKeys)){clickKey(key)};
    if(key == 0){clickKey("0")}
    if(key == "Enter" || key == "="){clickKey("equals")};
    if(key == "Delete"){clickKey("CLR")};
    if(key == "Backspace"){clickKey(key)};
};

document.addEventListener("keydown",logKey);

let removeCharFromDisplay = () => {
    display.textContent = display.textContent.slice(0,-1);
};

let operands = document.querySelectorAll('.operand');
operands.forEach(operand => operand.addEventListener("click",addToDisplay));

let operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener("click",addOperator));

let equals = document.getElementById("equals");
equals.addEventListener("click",handleOperate)

let backspace  = document.getElementById("Backspace");
backspace.addEventListener("click",removeCharFromDisplay)

let clear = document.querySelector('#CLR');
clear.addEventListener("click", function(){
    clearDisplay()
    clearOps()
})

